(function () {
  var links = window.SITE_LINKS || {};
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    if (key === 'collab') return;
    var url = links[key];
    if (url) { a.href = url; }
    else { a.classList.add('is-off'); a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
  });
  document.getElementById('yr').textContent = new Date().getFullYear();

  // highlight current section in the sidebar
  var navLinks = document.querySelectorAll('.side nav a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('main section').forEach(function (s) { io.observe(s); });
  }

  // photo gallery lightbox
  var lb = document.getElementById('lb');
  var shots = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
  var cur = 0;
  function show(i) {
    cur = (i + shots.length) % shots.length;
    var b = shots[cur], im = b.querySelector('img');
    lb.querySelector('img').src = b.getAttribute('data-src');
    lb.querySelector('img').alt = im.alt;
    lb.querySelector('p').textContent = b.parentNode.querySelector('figcaption').textContent;
  }
  if (lb && lb.showModal) {
    shots.forEach(function (b, i) { b.addEventListener('click', function () { show(i); lb.showModal(); }); });
    lb.querySelector('.lb-x').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }
})();
