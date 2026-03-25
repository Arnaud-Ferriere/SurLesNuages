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

    var headings = content.querySelectorAll('h2, h3');
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
})();
