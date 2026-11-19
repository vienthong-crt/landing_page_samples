/* ==========================================================================
   Khe Nâu — Roaster Instrument Interactions & Motion Orchestration
   ========================================================================== */

(() => {
  const docEl = document.documentElement;
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Progressive Motion Init + Safe Fallback
  if (!reducedMotion()) {
    docEl.classList.add('has-motion');
  }

  function initReveals() {
    const targets = [...document.querySelectorAll('[data-shutter]')];
    if (!targets.length) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const heroItems = targets.filter((el) => el.closest('.hero-bench'));
    requestAnimationFrame(() => {
      heroItems.forEach((el) => el.classList.add('is-in'));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => {
      if (el.closest('.hero-bench')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-in');
      } else {
        io.observe(el);
      }
    });

    setTimeout(() => {
      targets.forEach((el) => el.classList.add('is-in'));
    }, 1500);
  }

  // 2. Scroll Calibration Rule & Active Nav Section
  function initScrollCalibration() {
    const navLinks = [...document.querySelectorAll('.site-nav__link[href^="#"]')];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    let ticking = false;
    const update = () => {
      ticking = false;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      docEl.style.setProperty('--scroll-progress', progress.toFixed(4));

      if (sections.length) {
        const y = window.scrollY + 140;
        let currentId = '';
        for (const sec of sections) {
          if (sec.offsetTop <= y) currentId = `#${sec.id}`;
        }
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === currentId);
        });
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  // 3. Mobile Navigation Drawer
  function initNav() {
    const nav = document.querySelector('.site-nav');
    const toggle = nav?.querySelector('.nav-toggle');
    if (!nav || !toggle) return;

    const barsIcon =
      '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 14h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    const closeIcon =
      '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng trình đơn' : 'Mở trình đơn');
      toggle.innerHTML = open ? closeIcon : barsIcon;
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && e.target.closest('a[href]')) {
        setOpen(false);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  // 4. Mobile Sticky Action Bar (only visible between Hero and Booking CTA / Footer)
  function initMobileBar() {
    const bar = document.querySelector('.mobile-bar');
    const heroSec = document.querySelector('.hero-bench');
    const bookSec = document.getElementById('dat-lich');
    const footerSec = document.getElementById('contact');
    if (!bar || !heroSec || !bookSec || !('IntersectionObserver' in window)) return;

    let heroVisible = true;
    let bookVisible = false;
    let footerVisible = false;

    const syncBar = () => {
      const show = !heroVisible && !bookVisible && !footerVisible;
      bar.classList.toggle('is-visible', show);
      if (show) bar.removeAttribute('inert');
      else bar.setAttribute('inert', '');
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroSec) heroVisible = entry.isIntersecting;
          if (entry.target === bookSec) bookVisible = entry.isIntersecting;
          if (entry.target === footerSec) footerVisible = entry.isIntersecting;
        }
        syncBar();
      },
      { threshold: 0.05 }
    );
    io.observe(heroSec);
    io.observe(bookSec);
    if (footerSec) io.observe(footerSec);
  }

  // 5. Today Marker on Opening Hours (Asia/Ho_Chi_Minh)
  function initHours() {
    const dl = document.querySelector('.hours-list[data-tz]');
    if (!dl) return;
    const daysOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    let today;
    try {
      today = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: dl.dataset.tz })
        .format(new Date())
        .slice(0, 3)
        .toLowerCase();
    } catch {
      return;
    }

    const matchRange = (spec) => {
      const set = new Set();
      for (const token of spec.split(',')) {
        const part = token.trim().toLowerCase();
        if (part.includes('-')) {
          const [a, b] = part.split('-').map((s) => daysOrder.indexOf(s.trim()));
          if (a >= 0 && b >= 0) {
            for (let d = a; ; d = (d + 1) % 7) {
              set.add(daysOrder[d]);
              if (d === b) break;
            }
          }
        } else if (daysOrder.includes(part)) {
          set.add(part);
        }
      }
      return set;
    };

    for (const dt of dl.querySelectorAll('dt[data-days]')) {
      if (!matchRange(dt.dataset.days).has(today)) continue;
      dt.classList.add('is-today');
      const dd = dt.nextElementSibling;
      if (dd && dd.tagName === 'DD') dd.classList.add('is-today');
      break;
    }
  }

  // 6. Interactive Hero Bench <-> Booking Form Live Sync
  function initHeroBenchSync() {
    const slotBtns = [...document.querySelectorAll('.slot-pill[data-slot]')];
    const minusBtn = document.querySelector('[data-guest-step="-1"]');
    const plusBtn = document.querySelector('[data-guest-step="1"]');
    const guestOut = document.querySelector('[data-guest-count]');
    const reserveBtn = document.querySelector('[data-bench-reserve]');

    const formSlot = document.getElementById('f-slot');
    const formGuests = document.getElementById('f-guests');
    const formDate = document.getElementById('f-date');
    if (!slotBtns.length || !guestOut || !formSlot || !formGuests) return;

    let selectedSlot = '09:30-10:30';
    let guests = 2;

    const renderBench = () => {
      slotBtns.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.slot === selectedSlot));
      });
      guestOut.textContent = `${guests} khách`;
      if (minusBtn) minusBtn.disabled = guests <= 1;
      if (plusBtn) plusBtn.disabled = guests >= 6;
    };

    const syncToForm = () => {
      formSlot.value = selectedSlot;
      formGuests.value = String(guests);
      formSlot.removeAttribute('aria-invalid');
      formGuests.removeAttribute('aria-invalid');
      const errSlot = document.getElementById('f-slot-err');
      const errGuests = document.getElementById('f-guests-err');
      if (errSlot) errSlot.hidden = true;
      if (errGuests) errGuests.hidden = true;
    };

    slotBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedSlot = btn.dataset.slot;
        renderBench();
        syncToForm();
      });
    });

    const stepGuests = (delta) => {
      guests = Math.min(6, Math.max(1, guests + delta));
      renderBench();
      syncToForm();
    };
    minusBtn?.addEventListener('click', () => stepGuests(-1));
    plusBtn?.addEventListener('click', () => stepGuests(1));

    // Keep hero bench updated if user changes form directly
    formSlot.addEventListener('change', () => {
      if (formSlot.value) {
        selectedSlot = formSlot.value;
        renderBench();
      }
    });
    formGuests.addEventListener('input', () => {
      const n = parseInt(formGuests.value, 10);
      if (n >= 1 && n <= 6) {
        guests = n;
        renderBench();
      }
    });

    reserveBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      syncToForm();
      const targetSec = document.getElementById('dat-lich');
      targetSec?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });

      const slotField = formSlot.closest('.field');
      const guestsField = formGuests.closest('.field');
      [slotField, guestsField].forEach((f) => f?.classList.add('is-synced'));
      setTimeout(() => {
        [slotField, guestsField].forEach((f) => f?.classList.remove('is-synced'));
        formDate?.focus({ preventScroll: true });
      }, 650);
    });

    renderBench();
  }

  // 7. Interactive Menu Category Filter & Craft Strip Sync
  function initMenuFilter() {
    const tabs = [...document.querySelectorAll('.filter-tab[data-filter]')];
    const groups = [...document.querySelectorAll('.menu-group[data-group]')];
    const tiles = [...document.querySelectorAll('.craft-tile[data-group]')];
    if (!tabs.length || !groups.length) return;

    const applyFilter = (active) => {
      tabs.forEach((t) => {
        t.setAttribute('aria-selected', String(t.dataset.filter === active));
      });
      groups.forEach((g) => {
        const match = active === 'all' || g.dataset.group === active;
        g.classList.toggle('is-dimmed', !match);
        g.classList.toggle('is-highlighted', active !== 'all' && match);
      });
      tiles.forEach((tile) => {
        const match = active === 'all' || tile.dataset.group === active;
        tile.classList.toggle('is-dimmed', !match);
        tile.classList.toggle('is-highlighted', active !== 'all' && match);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
    });

    groups.forEach((group) => {
      const key = group.dataset.group;
      group.addEventListener('mouseenter', () => {
        if (document.querySelector('.filter-tab[aria-selected="true"]')?.dataset.filter !== 'all') return;
        tiles.forEach((tile) => {
          const same = tile.dataset.group === key;
          tile.classList.toggle('is-dimmed', !same);
          tile.classList.toggle('is-highlighted', same);
        });
      });
      group.addEventListener('mouseleave', () => {
        if (document.querySelector('.filter-tab[aria-selected="true"]')?.dataset.filter !== 'all') return;
        tiles.forEach((tile) => {
          tile.classList.remove('is-dimmed', 'is-highlighted');
        });
      });
    });
  }

  // 8. Accessible Booking Form Validation
  function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.noValidate = true;

    const status = form.querySelector('[data-form-status]');
    const fields = [...form.elements].filter(
      (el) => el.matches('input, select') && !/^(hidden|submit|button)$/.test(el.type)
    );

    const validateField = (el) => {
      const ok = el.checkValidity();
      const errId = el.getAttribute('aria-describedby');
      const errEl = errId ? document.getElementById(errId) : null;
      if (ok) {
        el.removeAttribute('aria-invalid');
        if (errEl) errEl.hidden = true;
        return true;
      }
      el.setAttribute('aria-invalid', 'true');
      if (errEl) errEl.hidden = false;
      return false;
    };

    fields.forEach((el) => {
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
        if (el.getAttribute('aria-invalid') === 'true') validateField(el);
      });
    });

    form.addEventListener('submit', async (e) => {
      const bad = fields.filter((el) => !validateField(el));
      if (bad.length) {
        e.preventDefault();
        if (status) {
          status.textContent = (form.dataset.fix || 'Còn {n} mục cần điền lại.').replace('{n}', String(bad.length));
        }
        bad[0].focus();
        return;
      }

      if (status) status.textContent = '';
      const endpoint = (form.dataset.endpoint || '').trim();
      if (!/^https?:\/\//.test(endpoint) && !endpoint.startsWith('/')) {
        // Native mailto: stand-in submit when no backend endpoint is configured
        return;
      }

      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const timer = setTimeout(() => {
        if (status) status.textContent = form.dataset.sending || 'Đang gửi yêu cầu...';
      }, 280);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        clearTimeout(timer);
        form.reset();
        if (status) status.textContent = form.dataset.sent || 'Đã gửi yêu cầu đặt lịch.';
      } catch {
        clearTimeout(timer);
        if (status) status.textContent = form.dataset.failed || 'Chưa gửi được do lỗi kết nối.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        }
      }
    });
  }

  initReveals();
  initScrollCalibration();
  initNav();
  initMobileBar();
  initHours();
  initHeroBenchSync();
  initMenuFilter();
  initBookingForm();
})();
