(function () {
    var content = document.querySelector('article .content');
    if (!content) return;

    // Wrap tables for responsive scroll + carte style
    function wrapTables(root) {
        root.querySelectorAll('table').forEach(function (table) {
            var wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            var scroll = document.createElement('div');
            scroll.className = 'table-scroll';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(scroll);
            scroll.appendChild(table);
        });
    }

    // Click-to-zoom for inline content images (exclude banners/covers)
    function setupImageZoom(root) {
        root.querySelectorAll('img').forEach(function (img) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function () {
                window.openImageModal(img.src, img.alt);
            });
        });
    }

    // Obsidian-style callouts : > [!WARNING], > [!NOTE], > [!TIP], > [!IMPORTANT], > [!CAUTION]
    function parseObsidianCallouts(root) {
        var calloutTypes = {
            'NOTE':      { icon: 'ℹ️',  label: 'Note' },
            'TIP':       { icon: '💡', label: 'Astuce' },
            'WARNING':   { icon: '⚠️', label: 'Attention' },
            'IMPORTANT': { icon: '❗', label: 'Important' },
            'CAUTION':   { icon: '🔴', label: 'Mise en garde' }
        };
        root.querySelectorAll('blockquote').forEach(function(bq) {
            var firstP = bq.querySelector('p');
            if (!firstP) return;
            var match = firstP.textContent.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
            if (!match) return;
            var type = match[1].toUpperCase();
            var info = calloutTypes[type];
            firstP.innerHTML = firstP.innerHTML.replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
            bq.classList.add('callout', 'callout-' + type.toLowerCase());
            var header = document.createElement('div');
            header.className = 'callout-header';
            header.textContent = info.icon + ' ' + info.label;
            bq.insertBefore(header, bq.firstChild);
        });
    }

    // Autolink des URLs brutes (https://...) dans les noeuds texte
    function autolinkUrls(root) {
        (function walk(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                var urlRegex = /(https?:\/\/[^\s<>'")\]]+)/g;
                if (!urlRegex.test(node.textContent)) return;
                var span = document.createElement('span');
                span.innerHTML = node.textContent.replace(/(https?:\/\/[^\s<>'")\]]+)/g, function(url) {
                    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
                });
                node.parentNode.replaceChild(span, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                var tag = node.tagName;
                if (tag === 'A' || tag === 'CODE' || tag === 'PRE' || tag === 'SCRIPT') return;
                Array.from(node.childNodes).forEach(walk);
            }
        })(root);
    }

    // Icône + target="_blank" sur tous les liens externes
    function decorateExternalLinks(root) {
        root.querySelectorAll('a[href^="http"]').forEach(function(a) {
            try { if (new URL(a.href).hostname === window.location.hostname) return; } catch(e) { return; }
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
            if (!a.querySelector('.fa-square-up-right')) {
                var icon = document.createElement('i');
                icon.className = 'fa-solid fa-square-up-right';
                icon.setAttribute('aria-hidden', 'true');
                icon.style.cssText = 'margin-left:0.25em;font-size:0.75em;vertical-align:middle;';
                a.appendChild(icon);
            }
        });
    }

    // Intercepte le bouton PDF : re-rend Mermaid en thème clair avant d'imprimer
    function setupPrintButton() {
        var printBtn = document.querySelector('.print-btn');
        if (!printBtn) return;
        printBtn.onclick = async function() {
            if (window.mermaidReRender) {
                await window.mermaidReRender('default');
                window.print();
                await window.mermaidReRender(window.mermaidGetTheme ? window.mermaidGetTheme() : 'default');
            } else {
                window.print();
            }
        };
    }

    // TOC — généré avant les boutons collapse pour que textContent soit propre
    function generateTOC(root) {
        var headings = root.querySelectorAll('h2, h3');
        if (headings.length < 3) return;
        var tocList = document.getElementById('toc-list');
        headings.forEach(function (h, i) {
            if (!h.id) h.id = 'heading-' + i;
            var li = document.createElement('li');
            if (h.tagName === 'H3') li.classList.add('toc-h3');
            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        });
        document.getElementById('toc-wrapper').style.display = 'block';
    }

    // Sections H2 repliables — Bootstrap collapse (accessibilité native)
    function setupH2Collapse(root) {
        root.querySelectorAll('h2').forEach(function (h2, idx) {
            var siblings = [];
            var next = h2.nextElementSibling;
            while (next && next.tagName !== 'H2') {
                siblings.push(next);
                next = next.nextElementSibling;
            }
            if (siblings.length === 0) return;

            var wrapperId = 'section-collapse-' + idx;

            var wrapper = document.createElement('div');
            wrapper.className = 'collapse show';
            wrapper.id = wrapperId;
            h2.parentNode.insertBefore(wrapper, siblings[0]);
            siblings.forEach(function (el) { wrapper.appendChild(el); });

            // Wrapper le contenu texte du H2 dans un span pour le styling
            var span = document.createElement('span');
            span.className = 'h2-text';
            while (h2.firstChild) span.appendChild(h2.firstChild);
            h2.appendChild(span);

            var btn = document.createElement('button');
            btn.className = 'collapse-section-btn';
            btn.setAttribute('type', 'button');
            btn.setAttribute('data-bs-toggle', 'collapse');
            btn.setAttribute('data-bs-target', '#' + wrapperId);
            btn.setAttribute('aria-controls', wrapperId);
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('aria-label', 'Réduire la section');
            btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
            h2.appendChild(btn);

            // Sync l'icône chevron + aria-* avec les événements Bootstrap (shared.js)
            window.setupCollapseSync(wrapper, btn);

            // Clic sur le H2 (hors bouton) déclenche aussi le collapse
            h2.addEventListener('click', function (e) {
                if (e.target === btn || btn.contains(e.target)) return;
                bootstrap.Collapse.getOrCreateInstance(wrapper).toggle();
            });
            h2.style.cursor = 'pointer';
        });
    }

    // Fonctions non-critiques différées après le premier paint
    var defer = window.requestIdleCallback || function(cb) { setTimeout(cb, 1); };

    wrapTables(content);
    setupImageZoom(content);
    parseObsidianCallouts(content);
    setupPrintButton();
    generateTOC(content);     // AVANT setupH2Collapse (dépendance textContent)
    setupH2Collapse(content);

    // autolinkUrls et decorateExternalLinks sont visuellement non-critiques
    // (pas d'impact sur la structure/layout). Différés pour libérer le thread.
    defer(function() {
        autolinkUrls(content);
        decorateExternalLinks(content);
    });
})();
