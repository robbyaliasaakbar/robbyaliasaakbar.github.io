/* ============================================================
   ROBBY ALIASA AKBAR — Portfolio Website
   main.js — navbar state, mobile menu, scroll reveal, misc
   Vanilla JS only — no dependencies.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------
       1. NAVBAR — solid/blurred state after scrolling
       -------------------------------------------------------- */
    var navbar = document.getElementById('site-navbar');

    if (navbar) {
      var onScroll = function () {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* --------------------------------------------------------
       2. MOBILE MENU — hamburger toggle
       -------------------------------------------------------- */
    var toggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('menu-hidden-state') === false;
        toggle.classList.toggle('menu-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close the menu when a link inside it is clicked
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.add('menu-hidden-state');
          toggle.classList.remove('menu-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* --------------------------------------------------------
       3. SCROLL REVEAL — IntersectionObserver
          Usage: <div data-reveal> or <div data-reveal="150"> (ms delay)
       -------------------------------------------------------- */
    var revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && revealEls.length > 0) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute('data-reveal'), 10);
            if (!isNaN(delay) && delay > 0) {
              el.style.transitionDelay = delay + 'ms';
            }
            el.classList.add('revealed');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }

    /* --------------------------------------------------------
       4. FOOTER YEAR — auto update
       -------------------------------------------------------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

  });
})();
