/* ============================================================
   Salt'n Pepper — main.js
   Mobile nav · Directional scroll reveal
   ============================================================ */
(function () {
    'use strict';

    /* ============================================================
       MOBILE NAV TOGGLE
       ============================================================ */
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.querySelector('.right-side');

    function closeNav() {
        if (!nav) return;
        nav.classList.remove('nav-open');
        if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = nav.classList.toggle('nav-open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        nav.querySelectorAll('.menu a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('click', function (e) {
            if (nav.classList.contains('nav-open') &&
                !nav.contains(e.target) &&
                !toggle.contains(e.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });
    }

    /* ============================================================
       SCROLL REVEAL — directional IntersectionObserver
       ============================================================ */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) return;

    /* ----------------------------------------------------------
       Helper: add a reveal class + optional stagger delay
       ---------------------------------------------------------- */
    function mark(el, cls, delay) {
        el.classList.add(cls);
        if (delay) el.style.transitionDelay = delay + 's';
    }

    /* ----------------------------------------------------------
       INTRO SECTION
       Heading block → up (centred)
       Brand cards   → scale + stagger
       ---------------------------------------------------------- */
    var introHeadings = document.querySelectorAll('.intro h2, .intro > p');
    introHeadings.forEach(function (el) { mark(el, 'reveal-up'); });

    var brandCards = document.querySelectorAll('.card-cotainer .cards');
    brandCards.forEach(function (el, i) {
        mark(el, 'reveal-scale', Math.min(i * 0.10, 0.30));
    });

    /* ----------------------------------------------------------
       RESTAURANT FRANCHISES — section heading
       ---------------------------------------------------------- */
    var restHeadings = document.querySelectorAll('.RestaurantText h2, .RestaurantText h3, .RestaurantText p');
    restHeadings.forEach(function (el) { mark(el, 'reveal-up'); });

    /* ----------------------------------------------------------
       FRANCHISE ROWS  (cardflax)
       Normal row:   text LEFT, image RIGHT
       Reverse row:  image LEFT, text RIGHT
       ---------------------------------------------------------- */
    document.querySelectorAll('.cardflax').forEach(function (row) {
        var isReverse = row.classList.contains('cardflax--reverse');
        var card = row.querySelector('.RestaurantCard');
        var img  = row.querySelector('.franchise-img');
        var btn  = row.querySelector('.RestaurantCard-btn');

        if (card) mark(card, isReverse ? 'reveal-right' : 'reveal-left');
        if (img)  mark(img,  isReverse ? 'reveal-left'  : 'reveal-right');
        if (btn)  { mark(btn, 'reveal-button'); btn.style.transitionDelay = '0.25s'; }
    });

    /* ----------------------------------------------------------
       EXPRESS FRANCHISES — heading + cards
       ---------------------------------------------------------- */
    var expressHeadings = document.querySelectorAll('.ExpressTwo h2, .ExpressTwo h3');
    expressHeadings.forEach(function (el) { mark(el, 'reveal-up'); });

    var expressCards = document.querySelectorAll('.Express-Cards');
    expressCards.forEach(function (el, i) {
        mark(el, 'reveal-scale', Math.min(i * 0.08, 0.32));
    });

    /* ----------------------------------------------------------
       VILLAGE FRANCHISE
       Heading → up
       Image   → left (visually left)
       Text    → right (visually right)
       Button  → bottom popup
       ---------------------------------------------------------- */
    var villageHeadings = document.querySelectorAll('.VillageText h2, .VillageText h3');
    villageHeadings.forEach(function (el) { mark(el, 'reveal-up'); });

    var villageImg  = document.querySelector('.villageimg');
    var villageText = document.querySelector('.villageText');
    var villageBtn  = document.querySelector('.villageText .RestaurantCard-btn');

    if (villageImg)  mark(villageImg,  'reveal-left');
    if (villageText) mark(villageText, 'reveal-right');
    if (villageBtn)  { mark(villageBtn, 'reveal-button'); villageBtn.style.transitionDelay = '0.25s'; }

    /* ----------------------------------------------------------
       OPENING SOON
       Heading → up
       Icon cards → scale + stagger (across both rows)
       ---------------------------------------------------------- */
    var openingHeadings = document.querySelectorAll('.OpeningText h2, .OpeningText h3');
    openingHeadings.forEach(function (el) { mark(el, 'reveal-up'); });

    var iconCards = document.querySelectorAll('.iconColor');
    iconCards.forEach(function (el, i) {
        mark(el, 'reveal-scale', Math.min(i * 0.10, 0.30));
    });

    /* ----------------------------------------------------------
       OBSERVE ALL MARKED ELEMENTS
       ---------------------------------------------------------- */
    var revealClasses = [
        '.reveal-left', '.reveal-right', '.reveal-up',
        '.reveal-image', '.reveal-button', '.reveal-scale'
    ];

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(revealClasses.join(', ')).forEach(function (el) {
        observer.observe(el);
    });

})();
