var btnChrono  = document.getElementById('btn-chrono');
var btnTags    = document.getElementById('btn-tags');
var viewChrono = document.getElementById('view-chrono');
var viewTags   = document.getElementById('view-tags');

function getNavbarHeight() {
    var navbar = document.querySelector('.navbar');
    return navbar ? navbar.offsetHeight : 0;
}

function scrollToAnchor(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - getNavbarHeight() - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
}

btnChrono.addEventListener('click', function () {
    viewChrono.style.display = '';
    viewTags.style.display = 'none';
    btnChrono.classList.add('active');
    btnChrono.setAttribute('aria-pressed', 'true');
    btnTags.classList.remove('active');
    btnTags.setAttribute('aria-pressed', 'false');
});

btnTags.addEventListener('click', function () {
    viewChrono.style.display = 'none';
    viewTags.style.display = '';
    btnTags.classList.add('active');
    btnTags.setAttribute('aria-pressed', 'true');
    btnChrono.classList.remove('active');
    btnChrono.setAttribute('aria-pressed', 'false');
});

function switchToTagsView(event, anchor) {
    event.preventDefault();
    btnTags.click();
    setTimeout(function () { scrollToAnchor(anchor); }, 50);
}

document.getElementById('view-tags').addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    scrollToAnchor(link.getAttribute('href').slice(1));
});

(function () {
    var hash = window.location.hash;
    if (!hash) return;
    var id = hash.slice(1);
    if (!document.getElementById(id)) return;
    btnTags.click();
    setTimeout(function () { scrollToAnchor(id); }, 50);
})();
