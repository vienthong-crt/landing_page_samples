/* =========================================================
   Nha khoa Gia đình An Tâm — main.js (vanilla, không thư viện)
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- CẤU HÌNH – sửa tại đây khi triển khai ---------------- */
  var CONFIG = {
    // URL Web App Google Apps Script (xem file apps-script/Code.gs). Để trống = chế độ demo.
    formEndpoint: '',
    thankYouUrl: 'thank-you.html',
    totalSlots: 100,
    slotsTaken: 63,
    offerDeadline: '2026-11-30T23:59:59+07:00',
    ga4Id: '',        // Điền mã thật (VD: 'G-ABC1234567') để tự động kích hoạt GA4
    metaPixelId: ''   // Điền mã thật (VD: '123456789012345') để tự động kích hoạt Meta Pixel
  };

  var PACKAGE_LABEL = {
    'free-checkup': 'Ưu đãi 01: Khám + Chụp phim X-Quang 3D 0đ',
    'scaling-99k': 'Ưu đãi 02: Cạo vôi răng siêu âm 99.000đ',
    'family-30': 'Ưu đãi 03: Gia đình đi từ 2 người (-30%)',
    'consult': 'Tư vấn chuyên sâu (Trẻ em / Niềng răng / Răng sứ / Implant)'
  };

  var PACKAGE_VALUE = {
    'free-checkup': 500000,
    'scaling-99k': 99000,
    'family-30': 1000000,
    'consult': 500000
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Tracking helpers ---------------- */
  function track(event, params) {
    params = params || {};
    try { if (window.gtag && CONFIG.ga4Id) window.gtag('event', event, params); } catch (e) {}
  }
  function pixel(event, params) {
    try { if (window.fbq && CONFIG.metaPixelId) window.fbq('track', event, params || {}); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('.js-contact');
    if (!el) return;
    var channel = el.getAttribute('data-channel') || 'unknown';
    pixel('Contact', { content_name: channel });
    track(channel === 'zalo' ? 'click_zalo' : 'click_hotline', { method: channel });
  });

  /* ---------------- Header: shadow khi cuộn ---------------- */
  var header = $('.header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  var toggle = $('.nav-toggle');
  var nav = $('#nav');
  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    var useEl = toggle.querySelector('use');
    if (useEl) useEl.setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  if (toggle) toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  if (nav) $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });

  /* ---------------- Slots còn lại ---------------- */
  var left = Math.max(CONFIG.totalSlots - CONFIG.slotsTaken, 0);
  $$('.js-slots').forEach(function (el) { el.textContent = left; });
  $$('.js-slots-taken').forEach(function (el) { el.textContent = CONFIG.slotsTaken; });
  var bar = $('.js-slots-bar');
  if (bar) {
    var pct = Math.round(CONFIG.slotsTaken / CONFIG.totalSlots * 100);
    bar.parentElement.setAttribute('aria-valuenow', pct);
    bar.style.width = pct + '%';
  }

  /* ---------------- Countdown ---------------- */
  function getDeadline() {
    if (CONFIG.offerDeadline) {
      var parsed = new Date(CONFIG.offerDeadline);
      if (!isNaN(parsed.getTime()) && parsed > new Date()) return parsed;
    }
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth() + 1, 0, 23, 59, 59);
  }
  var deadline = getDeadline();
  var cd = { d: $('.js-cd-d'), h: $('.js-cd-h'), m: $('.js-cd-m'), s: $('.js-cd-s') };
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };
  function tick() {
    var diff = Math.max(0, deadline - new Date());
    var s = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(s / 86400));
    cd.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cd.m.textContent = pad(Math.floor(s % 3600 / 60));
    cd.s.textContent = pad(s % 60);
  }
  if (cd.d) { tick(); setInterval(tick, 1000); }

  /* ---------------- Tabs dịch vụ (ARIA + phím mũi tên) ---------------- */
  var tabs = $$('[role="tab"]');
  function activate(tab, focus) {
    var activePanel = null;
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = !on;
        panel.classList.toggle('is-active', on);
        if (on) activePanel = panel;
      }
    });
    if (activePanel && window.AnTamMotion) window.AnTamMotion.animatePanel(activePanel);
    if (focus) tab.focus();
    track('select_generation', { generation: tab.id });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { activate(tab); });
    tab.addEventListener('keydown', function (e) {
      var k = e.key, next = null;
      if (k === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') next = tabs[0];
      if (k === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); activate(next, true); }
    });
  });

  /* ---------------- Chọn gói ưu đãi / Bác sĩ & hiển thị xác nhận trên form ---------------- */
  var needSel = $('#f-need');
  var noteInput = $('#f-note');
  var pickedBox = $('#form-picked');
  var pickedText = $('.form__picked-text', pickedBox);
  var pickedClear = $('.form__picked-clear', pickedBox);

  function updatePickedBanner(pkgKey, noteStr) {
    if (pkgKey && needSel) {
      needSel.value = pkgKey;
      validateField(needSel);
    }
    if (noteInput && noteStr !== undefined) {
      noteInput.value = noteStr;
    }
    if (!pickedBox || !pickedText) return;
    var label = needSel && needSel.value ? PACKAGE_LABEL[needSel.value] : '';
    var note = noteInput ? noteInput.value : '';
    if (!label && !note) {
      pickedBox.hidden = true;
      return;
    }
    var parts = [];
    if (label) parts.push(label);
    if (note) parts.push(note);
    pickedText.textContent = 'Đang chọn: ' + parts.join(' · ');
    pickedBox.hidden = false;
  }

  if (pickedClear) {
    pickedClear.addEventListener('click', function () {
      if (noteInput) noteInput.value = '';
      if (needSel) { needSel.value = ''; needSel.focus(); }
      if (pickedBox) pickedBox.hidden = true;
    });
  }

  /* ---------------- Hồ sơ bác sĩ (dialog) ---------------- */
  var DOCTORS = {
    d1: {
      name: 'BS. CKI Trần Minh Khôi', role: 'Bác sĩ trưởng · Implant & Phục hình', roleClass: 'doc__role--teal',
      img: 'assets/img/doctor-1.webp',
      intro: '15 năm kinh nghiệm phục hình răng và cấy ghép Implant. Bác sĩ Khôi nổi tiếng với cách giải thích kỹ lưỡng trên phim chụp 3D, đặc biệt được các cô chú lớn tuổi tin tưởng.',
      list: ['Bác sĩ Chuyên khoa I Răng Hàm Mặt – ĐH Y Dược TP.HCM', 'Chứng chỉ cấy ghép nha khoa Implant', 'Hơn 2.000 ca phục hình & Implant thành công', 'Chứng chỉ hành nghề số: 004821/HCM-CCHN']
    },
    d2: {
      name: 'ThS. BS. Nguyễn Thảo Vy', role: 'Chỉnh nha · Niềng răng', roleClass: 'doc__role--blue',
      img: 'assets/img/doctor-2.webp',
      intro: '10 năm chuyên sâu chỉnh nha cho trẻ em và người lớn. Bác sĩ Vy lập phác đồ dịch chuyển răng chi tiết trên phần mềm 3D để khách hàng xem trước kết quả.',
      list: ['Thạc sĩ Răng Hàm Mặt – ĐH Y Dược TP.HCM', 'Chứng nhận chỉnh nha khay trong suốt', 'Chứng chỉ chỉnh nha mắc cài tự buộc', 'Chứng chỉ hành nghề số: 005914/HCM-CCHN']
    },
    d3: {
      name: 'BS. Lê Ngọc Hân', role: 'Nha khoa trẻ em', roleClass: 'doc__role--coral',
      img: 'assets/img/doctor-3.webp',
      intro: '7 năm đồng hành cùng các bé từ 3–15 tuổi. Bác sĩ Hân áp dụng phương pháp "Nói – Cho xem – Làm" giúp bé chủ động hợp tác, không còn ám ảnh khi đi khám răng.',
      list: ['Bác sĩ Răng Hàm Mặt – ĐH Y khoa Phạm Ngọc Thạch', 'Chứng chỉ Nha khoa trẻ em & dự phòng sâu răng', 'Chứng chỉ tầm soát và tiền chỉnh nha (6–12 tuổi)', 'Chứng chỉ hành nghề số: 007238/HCM-CCHN']
    }
  };
  var modal = $('#doc-modal');
  var lastFocus = null;
  var currentDoctorName = '';
  $$('.doc__more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = DOCTORS[btn.getAttribute('data-doctor')];
      if (!d || !modal) return;
      lastFocus = btn;
      currentDoctorName = d.name;
      var photo = $('.modal__photo', modal);
      photo.src = d.img; photo.alt = 'Chân dung ' + d.name;
      var role = $('.js-m-role', modal);
      role.textContent = d.role; role.className = 'doc__role js-m-role ' + d.roleClass;
      $('.js-m-name', modal).textContent = d.name;
      $('.js-m-intro', modal).textContent = d.intro;
      $('.js-m-list', modal).innerHTML = d.list.map(function (x) { return '<li>' + x + '</li>'; }).join('');
      if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
      track('view_doctor', { doctor: d.name });
    });
  });
  function closeModal() { if (modal && modal.close) modal.close(); else if (modal) modal.removeAttribute('open'); }
  if (modal) {
    $('.modal__close', modal).addEventListener('click', closeModal);
    $('.js-m-book', modal).addEventListener('click', function () {
      var pkg = needSel && needSel.value ? needSel.value : 'free-checkup';
      updatePickedBanner(pkg, 'Đặt hẹn cùng ' + currentDoctorName);
      closeModal();
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });
  }

  /* ---------------- Gallery carousel ---------------- */
  var gallery = $('.gallery');
  function slide(dir) {
    if (!gallery) return;
    var item = $('.gallery__item', gallery);
    var step = item ? item.getBoundingClientRect().width + 16 : 300;
    gallery.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  var prev = $('.js-prev'), next = $('.js-next');
  if (prev) prev.addEventListener('click', function () { slide(-1); });
  if (next) next.addEventListener('click', function () { slide(1); });
  if (gallery) {
    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); slide(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); slide(-1); }
    });
  }

  /* ---------------- Chọn sẵn gói ưu đãi khi bấm CTA ---------------- */
  $$('.js-pick').forEach(function (a) {
    a.addEventListener('click', function () {
      var pkg = a.getAttribute('data-package');
      var note = a.getAttribute('data-note') || '';
      updatePickedBanner(pkg, note);
      track('cta_click', { package: pkg, note: note });
      setTimeout(function () {
        var n = $('#f-name');
        if (n && !n.value) n.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 600);
    });
  });

  /* ---------------- Form đặt lịch ---------------- */
  var form = $('#booking-form');
  var summary = $('.form__error-summary', form);
  // Hỗ trợ cả di động 10 số (03/05/07/08/09) và số cố định Việt Nam (02x...)
  var PHONE_RE = /^(0|\+?84)((3|5|7|8|9)\d{8}|2\d{8,9})$/;

  function normalizePhone(v) { return v.replace(/[\s.\-()]/g, ''); }

  function validateField(el) {
    if (!el) return '';
    var v = el.value.trim(), msg = '';
    if (el.name === 'name') {
      if (!v) msg = 'Vui lòng nhập họ tên để lễ tân tiện xưng hô.';
      else if (v.length < 2) msg = 'Họ tên cần ít nhất 2 ký tự.';
    }
    if (el.name === 'phone') {
      if (!v) msg = 'Vui lòng nhập số điện thoại để lễ tân gọi xác nhận lịch hẹn.';
      else if (!PHONE_RE.test(normalizePhone(v))) msg = 'Số điện thoại chưa đúng định dạng (VD: 0912 345 678 hoặc 028 3812 3456).';
    }
    if (el.name === 'need' && !v) msg = 'Vui lòng chọn gói ưu đãi hoặc nhu cầu khám.';
    var field = el.closest('.field');
    if (field) {
      var err = $('.field__err', field);
      if (err) err.textContent = msg;
      field.classList.toggle('is-invalid', !!msg);
      field.classList.toggle('is-valid', !msg && !!v);
    }
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return msg;
  }

  ['name', 'phone', 'need'].forEach(function (n) {
    var el = form.elements[n];
    if (!el) return;
    el.addEventListener('blur', function () { if (el.value) validateField(el); });
    el.addEventListener('input', function () {
      if (el.closest('.field').classList.contains('is-invalid')) validateField(el);
    });
    el.addEventListener('change', function () {
      validateField(el);
      if (n === 'need') updatePickedBanner(el.value, noteInput ? noteInput.value : '');
    });
  });

  var formStarted = false;
  form.addEventListener('focusin', function () {
    if (!formStarted) { formStarted = true; track('form_start', { form: 'booking' }); }
  });

  function genCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '';
    for (var i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return 'ANTAM-' + s;
  }

  function utm() {
    var p = new URLSearchParams(location.search), o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(function (k) {
      if (p.get(k)) o[k] = p.get(k);
    });
    return o;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements.website && form.elements.website.value) return;

    var fields = ['name', 'phone', 'need'].map(function (n) { return form.elements[n]; });
    var errors = fields.map(function (el) { return { el: el, msg: validateField(el) }; }).filter(function (x) { return x.msg; });

    if (errors.length) {
      summary.hidden = false;
      summary.textContent = errors.length > 1
        ? 'Vui lòng kiểm tra lại ' + errors.length + ' thông tin bên dưới.'
        : errors[0].msg;
      errors[0].el.focus();
      if (window.AnTamMotion) window.AnTamMotion.shake(errors[0].el.closest('.field'));
      return;
    }
    summary.hidden = true;

    var btn = $('.form__submit', form);
    btn.classList.add('is-loading');
    $('.form__submit-text', btn).textContent = 'Đang giữ suất...';

    var code = genCode();
    var pkgKey = form.elements.need.value;
    var pkgLabel = PACKAGE_LABEL[pkgKey] || pkgKey;
    var extraNote = noteInput && noteInput.value ? ' (' + noteInput.value + ')' : '';
    var data = Object.assign({
      name: form.elements.name.value.trim(),
      phone: normalizePhone(form.elements.phone.value),
      need: pkgLabel + extraNote,
      value: PACKAGE_VALUE[pkgKey] || 500000,
      code: code,
      page: location.href,
      submitted_at: new Date().toISOString()
    }, utm());

    var done = function () {
      try {
        sessionStorage.setItem('antam_lead', JSON.stringify({
          name: data.name,
          need: data.need,
          value: data.value,
          code: code,
          pending: true
        }));
      } catch (err) {}
      location.href = CONFIG.thankYouUrl + '?code=' + encodeURIComponent(code);
    };

    if (!CONFIG.formEndpoint) { setTimeout(done, 550); return; }

    var body = new URLSearchParams(data);
    fetch(CONFIG.formEndpoint, { method: 'POST', body: body })
      .then(function (res) {
        if (!res.ok && res.type !== 'opaque') throw new Error('HTTP ' + res.status);
        done();
      })
      .catch(function () {
        btn.classList.remove('is-loading');
        $('.form__submit-text', btn).textContent = 'Giữ suất ưu đãi ngay';
        summary.hidden = false;
        summary.textContent = 'Kết nối tạm thời gián đoạn. Vui lòng thử lại hoặc gọi trực tiếp Hotline 0909 123 456.';
        summary.focus();
      });
  });

  /* ---------------- Misc ---------------- */
  $$('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
