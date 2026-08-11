document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var pending = Array.prototype.slice.call(revealEls);

    var revealIfClose = function () {
      var vh = window.innerHeight;
      pending = pending.filter(function (el) {
        var elTop = el.getBoundingClientRect().top;
        if (elTop < vh + 200) {
          el.classList.add('in-view');
          return false;
        }
        return true;
      });
    };

    var tick = function () {
      if (!pending.length) return;
      revealIfClose();
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    window.addEventListener('scroll', revealIfClose, { passive: true });
    window.addEventListener('resize', revealIfClose);
  }
});
