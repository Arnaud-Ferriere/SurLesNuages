/* Helpers partagés entre les pages — chargé avant post.js et about.js */
(function () {
    // Sync de l'icône chevron et aria-label d'un bouton de collapse Bootstrap
    window.setupCollapseSync = function (wrapper, btn, config) {
        config = config || {};
        var expandLabel = config.expandLabel || 'Développer la section';
        var collapseLabel = config.collapseLabel || 'Réduire la section';
        wrapper.addEventListener('hide.bs.collapse', function () {
            btn.querySelector('i').className = 'fas fa-chevron-down';
            btn.setAttribute('aria-label', expandLabel);
            btn.setAttribute('aria-expanded', 'false');
        });
        wrapper.addEventListener('show.bs.collapse', function () {
            btn.querySelector('i').className = 'fas fa-chevron-up';
            btn.setAttribute('aria-label', collapseLabel);
            btn.setAttribute('aria-expanded', 'true');
        });
    };

    // Ouvrir une image dans le modal Bootstrap global (#imageModal)
    window.openImageModal = function (src, alt) {
        var modalImg = document.getElementById('modalImage');
        if (!modalImg) return;
        modalImg.src = src;
        modalImg.alt = alt || '';
        bootstrap.Modal.getOrCreateInstance(document.getElementById('imageModal')).show();
    };

    // Keyboard shortcut "/" → focus the search input (home page only)
    document.addEventListener('keydown', function (e) {
        if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
        var tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
        var input = document.getElementById('home-search-input');
        if (!input) return;
        e.preventDefault();
        input.focus();
        input.select();
    });
})();
