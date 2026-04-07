(function () {
    var content = document.querySelector('article .content');
    if (!content) return;

    // Wrap tables for responsive scroll + carte style
    content.querySelectorAll('table').forEach(function (table) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        var scroll = document.createElement('div');
        scroll.className = 'table-scroll';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(scroll);
        scroll.appendChild(table);
    });

    // Click-to-zoom for inline content images (exclude banners/covers)
    content.querySelectorAll('img').forEach(function (img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            var modalImg = document.getElementById('modalImage');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            bootstrap.Modal.getOrCreateInstance(document.getElementById('imageModal')).show();
        });
    });

    // Obsidian-style callouts : > [!WARNING], > [!NOTE], > [!TIP], > [!IMPORTANT], > [!CAUTION]
    var calloutTypes = {
        'NOTE':      { icon: 'ℹ️',  label: 'Note' },
        'TIP':       { icon: '💡', label: 'Astuce' },
        'WARNING':   { icon: '⚠️', label: 'Attention' },
        'IMPORTANT': { icon: '❗', label: 'Important' },
        'CAUTION':   { icon: '🔴', label: 'Mise en garde' }
    };
    content.querySelectorAll('blockquote').forEach(function(bq) {
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

    // Autolink des URLs brutes (https://...) dans les noeuds texte
    (function autolinkUrls(node) {
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
            Array.from(node.childNodes).forEach(autolinkUrls);
        }
    })(content);

    // Icône + target="_blank" sur tous les liens externes
    content.querySelectorAll('a[href^="http"]').forEach(function(a) {
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

    // Intercepte le bouton PDF : re-rend Mermaid en thème clair avant d'imprimer
    var printBtn = document.querySelector('.print-btn');
    if (printBtn) {
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
    var headings = content.querySelectorAll('h2, h3');
    if (headings.length >= 3) {
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
    content.querySelectorAll('h2').forEach(function (h2, idx) {
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

        // Sync l'icône avec les événements Bootstrap
        wrapper.addEventListener('hide.bs.collapse', function () {
            btn.querySelector('i').className = 'fas fa-chevron-down';
            btn.setAttribute('aria-label', 'Développer la section');
        });
        wrapper.addEventListener('show.bs.collapse', function () {
            btn.querySelector('i').className = 'fas fa-chevron-up';
            btn.setAttribute('aria-label', 'Réduire la section');
        });

        // Clic sur le H2 (hors bouton) déclenche aussi le collapse
        h2.addEventListener('click', function (e) {
            if (e.target === btn || btn.contains(e.target)) return;
            bootstrap.Collapse.getOrCreateInstance(wrapper).toggle();
        });
        h2.style.cursor = 'pointer';
    });
})();
