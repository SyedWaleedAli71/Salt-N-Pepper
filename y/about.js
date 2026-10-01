/* ============================================================
   Salt'n Pepper — about.js
   Directional scroll reveal for About Us page
   ============================================================ */
(function () {
    'use strict';

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) return;

    /* ----------------------------------------------------------
       Helper: add reveal class + optional stagger delay
       ---------------------------------------------------------- */
    function mark(el, cls, delay) {
        if (!el) return;
        el.classList.add(cls);
        if (delay) el.style.transitionDelay = delay + 's';
    }

    /* ----------------------------------------------------------
       OUR STORY
       Image  → left (visually left)
       Text   → right (visually right)
       Button → bottom popup
       ---------------------------------------------------------- */
    mark(document.querySelector('.about-story__img-wrap'), 'reveal-left');
    mark(document.querySelector('.about-story__text'),     'reveal-right');
    var storyBtn = document.querySelector('.about-story__text .about-btn');
    if (storyBtn) { mark(storyBtn, 'reveal-button'); storyBtn.style.transitionDelay = '0.25s'; }

    /* ----------------------------------------------------------
       OUR MISSION
       Text  → left (visually left)
       Cards → right side, staggered scale
       ---------------------------------------------------------- */
    mark(document.querySelector('.about-mission__text'), 'reveal-left');

    document.querySelectorAll('.mission-card').forEach(function (el, i) {
        mark(el, 'reveal-scale', Math.min(i * 0.10, 0.30));
    });

    /* ----------------------------------------------------------
       WHAT MAKES US DIFFERENT
       Section header → up (centred)
       Cards → scale + stagger
       ---------------------------------------------------------- */
    var diffHeader = document.querySelector('.about-different .about-section-header');
    if (diffHeader) {
        diffHeader.querySelectorAll('.about-eyebrow, h2, .about-section-sub').forEach(function (el, i) {
            mark(el, 'reveal-up', i * 0.08);
        });
    }

    document.querySelectorAll('.diff-card').forEach(function (el, i) {
        mark(el, 'reveal-scale', Math.min(i * 0.10, 0.30));
    });

    /* ----------------------------------------------------------
       OUR VALUES
       Section header → up (centred)
       Value items → alternate left / right
       ---------------------------------------------------------- */
    var valHeader = document.querySelector('.about-values .about-section-header');
    if (valHeader) {
        valHeader.querySelectorAll('.about-eyebrow, h2').forEach(function (el, i) {
            mark(el, 'reveal-up', i * 0.08);
        });
    }

    document.querySelectorAll('.value-item').forEach(function (el, i) {
        mark(el, i % 2 === 0 ? 'reveal-left' : 'reveal-right', Math.min(i * 0.08, 0.24));
    });

    /* ----------------------------------------------------------
       RESTAURANT EXPERIENCE (parallax section)
       Content block → up (centred)
       Button → bottom popup
       ---------------------------------------------------------- */
    var expContent = document.querySelector('.about-experience__content');
    if (expContent) {
        expContent.querySelectorAll('.about-eyebrow, h2, p').forEach(function (el, i) {
            mark(el, 'reveal-up', i * 0.10);
        });
        var expBtn = expContent.querySelector('.about-btn');
        if (expBtn) { mark(expBtn, 'reveal-button'); expBtn.style.transitionDelay = '0.35s'; }
    }

    /* ----------------------------------------------------------
       CALL TO ACTION
       Heading + paragraph → up
       Buttons → bottom popup + stagger
       ---------------------------------------------------------- */
    var ctaInner = document.querySelector('.about-cta__inner');
    if (ctaInner) {
        ctaInner.querySelectorAll('h2, p').forEach(function (el, i) {
            mark(el, 'reveal-up', i * 0.08);
        });
        ctaInner.querySelectorAll('.about-btn').forEach(function (el, i) {
            mark(el, 'reveal-button', 0.20 + i * 0.10);
        });
    }

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
