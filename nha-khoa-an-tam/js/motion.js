/* =========================================================
   Nha khoa Gia đình An Tâm — motion.js (/impeccable quieter)
   Chuyển động tinh gọn, điềm đạm chuẩn y khoa:
   - Khoảng cách ngắn (y: 12px), không bounce/elastic, không vòng lặp ngầm
   - Chỉ chạy từ trạng thái hiển thị an toàn, không bao giờ kẹt opacity: 0
   - Không phát sinh lỗi ScrollTrigger khi resize viewport
   ========================================================= */
(function () {
  'use strict';

  if (!window.gsap) return;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var ScrollToPlugin = window.ScrollToPlugin;

  if (ScrollTrigger && ScrollToPlugin) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
  document.documentElement.classList.add('has-gsap');

  var isReduced = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /* ---------------- API tương tác dùng chung với main.js ---------------- */
  window.AnTamMotion = {
    animatePanel: function (panel) {
      if (!panel || isReduced()) return;
      var items = panel.querySelectorAll('.panel__media, .panel__body > *');
      if (!items.length) return;
      gsap.killTweensOf(items);
      gsap.fromTo(
        items,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.26,
          stagger: 0.03,
          ease: 'power2.out',
          overwrite: 'auto',
          clearProps: 'transform,opacity'
        }
      );
      if (ScrollTrigger) ScrollTrigger.refresh();
    },

    shake: function (el) {
      if (!el || isReduced()) return;
      gsap.killTweensOf(el);
      gsap.timeline()
        .to(el, { x: -6, duration: 0.05, ease: 'power2.inOut' })
        .to(el, { x: 6, duration: 0.06, ease: 'power2.inOut' })
        .to(el, { x: -4, duration: 0.05, ease: 'power2.inOut' })
        .to(el, { x: 4, duration: 0.05, ease: 'power2.inOut' })
        .to(el, { x: 0, duration: 0.05, ease: 'power2.out', clearProps: 'x' });
    }
  };

  /* ---------------- Cuộn trang mượt đến section ---------------- */
  var header = document.querySelector('.header');
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    var offsetY = (header ? header.offsetHeight : 68) + 12;

    if (isReduced() || !ScrollToPlugin) {
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - offsetY);
      return;
    }

    gsap.to(window, {
      duration: 0.55,
      ease: 'power3.out',
      scrollTo: { y: target, offsetY: offsetY, autoKill: true }
    });
  });

  if (!ScrollTrigger) return;

  /* ---------------- Thanh tiến độ đọc ---------------- */
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  if (isReduced()) return;

  /* ---------------- 1. Hero entrance (nhẹ, không bounce) ---------------- */
  var heroCopy = gsap.utils.toArray('.hero__copy > *');
  var heroPhoto = document.querySelector('.hero__photo');
  if (heroCopy.length) {
    gsap.from(heroCopy, {
      y: 12,
      opacity: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }
  if (heroPhoto) {
    gsap.from(heroPhoto, {
      y: 12,
      opacity: 0,
      duration: 0.5,
      delay: 0.08,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }

  /* ---------------- 2. Scroll reveals nhẹ cho các khối chính ---------------- */
  var groups = [
    { sel: '.trust__item', trig: '.trust', stagger: 0.05 },
    { sel: '.countdown-wrap > *', trig: '.countdown-wrap', stagger: 0.07 },
    { sel: '.voucher', trig: '.vouchers', stagger: 0.07 },
    { sel: '.zz', trig: null, each: true },
    { sel: '.doc', trig: '.doc-grid', stagger: 0.07 },
    { sel: '.review', trig: '.reviews', stagger: 0.07 },
    { sel: '.price-card, .faq', trig: '.pricing__grid', stagger: 0.08 },
    { sel: '.booking__form-wrap, .booking .contact', trig: '.booking', stagger: 0.08, start: 'top 95%' }
  ];

  groups.forEach(function (g) {
    var els = gsap.utils.toArray(g.sel);
    if (!els.length) return;

    if (g.each) {
      els.forEach(function (el) {
        gsap.from(el, {
          y: 14,
          opacity: 0,
          duration: 0.48,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        });
      });
      return;
    }

    var trigEl = g.trig ? document.querySelector(g.trig) : els[0];
    if (!trigEl) return;

    gsap.from(els, {
      y: 14,
      opacity: 0,
      duration: 0.48,
      stagger: g.stagger || 0.06,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: trigEl,
        start: g.start || 'top 88%',
        once: true
      }
    });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
