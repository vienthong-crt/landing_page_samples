/* ==========================================================================
   ApexStore Laptop Landing Page — Polished State Sync, Validation, UX & GSAP
   ========================================================================== */

(() => {
  'use strict';

  const DRAFT_KEY = 'apexstore_draft_v1';

  const COLOR_MAP = {
    'Đen Titan': { slug: 'titanium', hex: '#181C24' },
    'Xám Không Gian': { slug: 'space-grey', hex: '#4B5563' },
    'Bạc Khói': { slug: 'silver-mist', hex: '#CBD5E1' }
  };

  const CITY_SLA = {
    hn: 'Miễn phí giao hỏa tốc 2h',
    hcm: 'Miễn phí giao hỏa tốc 2h',
    dn: 'Miễn phí giao trong ngày (24h)',
    other: 'Miễn phí toàn quốc (24–48h)'
  };

  const LAPTOP_MODELS = {
    air14: {
      name: 'ApexBook Air 14',
      weightLabel: '1.12kg',
      ganWatt: '100W',
      shortCpu: 'Core Ultra 5 (40 TOPS)',
      shortDisplay: '14" 2.8K OLED 120Hz',
      shortBattery: '72Wh · GaN 100W',
      specs: {
        cpu: 'Intel Core Ultra 5 225H (14 nhân 18 luồng, xung nhịp tối đa 4.9GHz)',
        npu: 'Intel AI Boost · 40 TOPS (tối ưu Copilot & tác vụ văn phòng thông minh)',
        gpu: 'Intel Arc Graphics tích hợp (hỗ trợ xuất 2 màn hình 4K 120Hz)',
        cooling: '2 ống đồng tản nhiệt kép + quạt siêu êm 21dB chế độ Quiet',
        screen: '14.0 inch 2.8K (2880 x 1800) OLED tỷ lệ 16:10, 120Hz, 0.2ms',
        color: '100% DCI-P3, chuẩn DisplayHDR True Black 500, độ sáng 400–600 nits',
        ram: '16GB / 32GB LPDDR5X-7467MHz hàn chết băng thông cao',
        ssd: '512GB / 1TB M.2 NVMe PCIe 4.0 (tốc độ đọc 6.800 MB/s)',
        ports: '2x Thunderbolt 4 (40Gbps + PD 100W), 1x USB-A 3.2, 1x HDMI 2.1, Jack 3.5mm',
        battery: '72Wh Li-Polymer · Củ sạc nhanh GaN 100W kèm cáp bọc dù 2m',
        weight: '1.12 kg · 312 x 221 x 13.9 mm · Nhôm CNC siêu nhẹ chuẩn MIL-STD-810H'
      },
      tiers: [
        { id: '16-512', label: '16GB / 512GB SSD', sub: 'Chuẩn văn phòng', price: 21990000, listed: 24990000 },
        { id: '32-1tb', label: '32GB / 1TB SSD', sub: 'Đa nhiệm chuyên sâu', price: 24990000, listed: 28490000 }
      ]
    },
    pro16: {
      name: 'ApexBook Pro 16',
      weightLabel: '1.48kg',
      ganWatt: '140W',
      shortCpu: 'Ryzen AI 9 (50 TOPS)',
      shortDisplay: '16" 3.2K 165Hz',
      shortBattery: '99.9Wh · GaN 140W',
      specs: {
        cpu: 'AMD Ryzen AI 9 HX 370 (12 nhân 24 luồng, xung nhịp tối đa 5.1GHz, 36MB Cache)',
        npu: 'XDNA 2 · 50 TOPS (hỗ trợ Copilot+ PC, chạy mô hình AI offline mượt mà)',
        gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (MUX Switch tối ưu FPS & pin, TGP 100W)',
        cooling: 'Buồng hơi Vapor Chamber đồng nguyên khối + 2 quạt LCP 89 cánh siêu êm',
        screen: '16.0 inch 3.2K (3200 x 2000) Mini-LED tỷ lệ 16:10, tần số quét 165Hz',
        color: '100% DCI-P3, 100% sRGB, cân chỉnh Pantone Delta E < 1, đỉnh sáng 1000 nits HDR',
        ram: '32GB / 64GB LPDDR5X-7500MHz kênh đôi băng thông cao',
        ssd: '1TB / 2TB M.2 NVMe PCIe 4.0 (tốc độ đọc 7.100 MB/s), hỗ trợ 2 khe SSD',
        ports: '2x USB4 / Thunderbolt 4 (40Gbps + Sạc 140W), 2x USB-A 3.2, 1x HDMI 2.1, Khe thẻ SD UHS-II, Jack 3.5mm',
        battery: '99.9Wh Li-Polymer · Củ sạc nhanh GaN 140W kèm cáp bọc dù 2m',
        weight: '1.48 kg · 354 x 246 x 15.8 mm · Nhôm CNC Series 6000 đạt chuẩn bền quân đội MIL-STD-810H'
      },
      tiers: [
        { id: '32-1tb', label: '32GB / 1TB SSD', sub: 'Phiên bản Pro chuẩn', price: 34990000, listed: 39990000 },
        { id: '64-2tb', label: '64GB / 2TB SSD', sub: 'Render & AI Local', price: 40990000, listed: 46490000 }
      ]
    },
    ultra16: {
      name: 'ApexBook Ultra X16',
      weightLabel: '1.95kg',
      ganWatt: '240W',
      shortCpu: 'Core Ultra 9 (55 TOPS)',
      shortDisplay: '16" QHD+ 240Hz',
      shortBattery: '99.9Wh · GaN 240W',
      specs: {
        cpu: 'Intel Core Ultra 9 285HX (24 nhân, xung nhịp tối đa 5.5GHz, TDP đỉnh 135W)',
        npu: 'Intel NPU + Tensor Core RTX 5070 · Tổng hiệu năng AI tới 850 AI TOPS',
        gpu: 'NVIDIA GeForce RTX 5070 12GB GDDR7 (DLSS 4 + MUX Switch, TGP 140W)',
        cooling: 'Buồng hơi Vapor Chamber cỡ lớn + Keo kim loại lỏng Liquid Metal',
        screen: '16.0 inch QHD+ (2560 x 1600) OLED/IPS 240Hz, G-Sync, 100% DCI-P3',
        color: '100% DCI-P3, Pantone Validated, hỗ trợ Dolby Vision Gaming 550 nits',
        ram: '32GB / 64GB DDR5-6400MHz (2 khe SO-DIMM nâng cấp tối đa 96GB)',
        ssd: '1TB / 2TB M.2 NVMe PCIe 5.0 (tốc độ đọc 12.400 MB/s), 2 khe M.2 RAID 0/1',
        ports: '2x Thunderbolt 5 / USB4, 3x USB-A 3.2, HDMI 2.1, LAN 2.5Gbps RJ45, SD UHS-II',
        battery: '99.9Wh Li-Polymer · Củ sạc nhanh GaN 240W siêu gọn',
        weight: '1.95 kg · 356 x 252 x 19.2 mm · Khung nhôm hợp kim Magie CNC'
      },
      tiers: [
        { id: '32-1tb', label: '32GB / 1TB Gen5', sub: 'Gaming & 3D', price: 44990000, listed: 49990000 },
        { id: '64-2tb', label: '64GB / 2TB Gen5', sub: 'Workstation Max', price: 48990000, listed: 54990000 }
      ]
    }
  };

  const state = {
    modelId: 'pro16',
    tierIndex: 0,
    color: 'Đen Titan',
    qty: 1,
    payment: 'cod',
    city: 'hn',
    formStarted: false,
    formSubmitted: false
  };

  const formatVND = (amount) => `${Math.round(amount).toLocaleString('vi-VN')}đ`;

  // ========================================================================
  // Analytics & CRO Tracking
  // ========================================================================
  window.dataLayer = window.dataLayer || [];
  window.apexAnalytics = window.apexAnalytics || [];
  const scrollMilestonesFired = new Set();

  function trackEvent(eventName, payload = {}) {
    const entry = { event: eventName, timestamp: new Date().toISOString(), ...payload };
    window.dataLayer.push(entry);
    window.apexAnalytics.push(entry);
  }

  function handleScrollDepth() {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const pct = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));

    [25, 50, 75, 100].forEach((milestone) => {
      if (pct >= milestone && !scrollMilestonesFired.has(milestone)) {
        scrollMilestonesFired.add(milestone);
        trackEvent('scroll_depth', { percent: milestone });
      }
    });
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleScrollDepth();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ========================================================================
  // DOM References
  // ========================================================================
  const els = {
    heroModelBtns: document.querySelectorAll('[data-model-select]'),
    heroActiveConfig: document.getElementById('hero-active-config'),
    heroPriceCurrent: document.getElementById('hero-price-current'),
    heroPriceOld: document.getElementById('hero-price-old'),
    heroDiscountTag: document.getElementById('hero-discount-tag'),
    heroInstallment: document.getElementById('hero-installment'),
    heroFrame: document.getElementById('hero-frame'),
    heroFinishDot: document.getElementById('hero-finish-dot'),
    heroFinishLabel: document.getElementById('hero-finish-label'),
    heroChipCpu: document.getElementById('hero-chip-cpu'),
    heroChipDisplay: document.getElementById('hero-chip-display'),
    heroChipBattery: document.getElementById('hero-chip-battery'),

    checkoutModelBtns: document.querySelectorAll('#checkout-model-group [data-model]'),
    checkoutTierGroup: document.getElementById('checkout-tier-group'),
    checkoutColorBtns: document.querySelectorAll('#checkout-color-group [data-color]'),
    qtyMinus: document.getElementById('qty-minus'),
    qtyPlus: document.getElementById('qty-plus'),
    qtyDisplay: document.getElementById('qty-display'),

    summaryConfig: document.getElementById('summary-config-text'),
    summaryListed: document.getElementById('summary-listed'),
    summarySavings: document.getElementById('summary-savings'),
    summaryBankRow: document.getElementById('summary-bank-row'),
    summaryShipping: document.getElementById('summary-shipping'),
    summaryTotal: document.getElementById('summary-total'),
    summaryMonthly: document.getElementById('summary-monthly'),
    paymentGuide: document.getElementById('payment-guide'),
    mobileRecapConfig: document.getElementById('mobile-recap-config'),
    mobileRecapTotal: document.getElementById('mobile-recap-total'),
    submitBtnLabel: document.getElementById('submit-btn-label'),
    submitBtnPrice: document.getElementById('submit-btn-price'),

    stickyBar: document.getElementById('sticky-mobile-bar'),
    stickyModelName: document.getElementById('sticky-model-name'),
    stickyModelPrice: document.getElementById('sticky-model-price'),

    specTabs: document.querySelectorAll('[data-spec-model]'),
    specsPanel: document.getElementById('specs-accordion'),
    citySelect: document.getElementById('customer-city')
  };

  function getSelectedTier() {
    const model = LAPTOP_MODELS[state.modelId];
    return model.tiers[state.tierIndex] || model.tiers[0];
  }

  function getTotals() {
    const tier = getSelectedTier();
    const listedTotal = tier.listed * state.qty;
    const subtotal = tier.price * state.qty;
    const savings = listedTotal - subtotal;
    const bankDiscount = state.payment === 'bank' ? 300000 : 0;
    const finalTotal = Math.max(0, subtotal - bankDiscount);
    const monthly = finalTotal / 12;
    const cccdUpfront = Math.round(finalTotal * 0.2);
    return { tier, listedTotal, subtotal, savings, bankDiscount, finalTotal, monthly, cccdUpfront };
  }

  // ========================================================================
  // Draft Persistence (localStorage)
  // ========================================================================
  function saveDraft() {
    try {
      const payload = {
        modelId: state.modelId,
        tierIndex: state.tierIndex,
        color: state.color,
        qty: state.qty,
        payment: state.payment,
        city: state.city,
        name: document.getElementById('customer-name')?.value || '',
        phone: document.getElementById('customer-phone')?.value || '',
        address: document.getElementById('customer-address')?.value || '',
        note: document.getElementById('customer-note')?.value || ''
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch (_) {
      // Ignore storage quota / privacy mode errors
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.modelId && LAPTOP_MODELS[saved.modelId]) state.modelId = saved.modelId;
      if (typeof saved.tierIndex === 'number') state.tierIndex = saved.tierIndex;
      if (saved.color && COLOR_MAP[saved.color]) state.color = saved.color;
      if (typeof saved.qty === 'number' && saved.qty >= 1 && saved.qty <= 10) state.qty = saved.qty;
      if (['cod', 'bank', 'installment'].includes(saved.payment)) {
        state.payment = saved.payment;
        const radio = document.querySelector(`input[name="payment"][value="${saved.payment}"]`);
        if (radio) radio.checked = true;
      }
      if (saved.city && CITY_SLA[saved.city] && els.citySelect) {
        state.city = saved.city;
        els.citySelect.value = saved.city;
      }
      if (saved.name) document.getElementById('customer-name').value = saved.name;
      if (saved.phone) document.getElementById('customer-phone').value = saved.phone;
      if (saved.address) document.getElementById('customer-address').value = saved.address;
      if (saved.note) document.getElementById('customer-note').value = saved.note;
    } catch (_) {
      // Ignore malformed draft
    }
  }

  // ========================================================================
  // Synchronized Rendering Across Hero, Specs & Checkout
  // ========================================================================
  function renderTierButtons() {
    const model = LAPTOP_MODELS[state.modelId];
    els.checkoutTierGroup.innerHTML = model.tiers.map((tier, idx) => `
      <button
        type="button"
        class="variant-btn"
        role="radio"
        aria-checked="${idx === state.tierIndex ? 'true' : 'false'}"
        tabindex="${idx === state.tierIndex ? '0' : '-1'}"
        data-tier-index="${idx}"
      >
        <span class="variant-btn__title">${tier.label}</span>
        <span class="variant-btn__sub tnum">${formatVND(tier.price)} (${tier.sub})</span>
      </button>
    `).join('');

    els.checkoutTierGroup.querySelectorAll('[data-tier-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tierIndex = Number(btn.dataset.tierIndex);
        trackEvent('variant_select', { type: 'tier', model: state.modelId, tier: getSelectedTier().id });
        syncAllUI();
        saveDraft();
        pulsePriceFeedback(els.summaryTotal);
        pulsePriceFeedback(els.heroPriceCurrent);
      });
    });
  }

  function syncHero() {
    const model = LAPTOP_MODELS[state.modelId];
    const { tier, savings, finalTotal, monthly } = getTotals();
    const colorInfo = COLOR_MAP[state.color] || COLOR_MAP['Đen Titan'];

    els.heroModelBtns.forEach((btn) => {
      const selected = btn.dataset.modelSelect === state.modelId;
      btn.setAttribute('aria-checked', String(selected));
      btn.setAttribute('tabindex', selected ? '0' : '-1');
    });

    const unitPrice = tier.price;
    const unitSaving = tier.listed - tier.price;
    const unitMonthly = unitPrice / 12;

    els.heroActiveConfig.innerHTML = `Đang chọn: <strong>${model.name} · ${tier.label} · ${state.color}</strong>`;
    els.heroPriceCurrent.textContent = formatVND(state.qty > 1 ? finalTotal : unitPrice);
    els.heroPriceOld.textContent = formatVND(state.qty > 1 ? tier.listed * state.qty : tier.listed);
    els.heroDiscountTag.textContent = `Giảm ${formatVND(state.qty > 1 ? savings : unitSaving)}`;
    els.heroInstallment.innerHTML = `Trả góp 0% chỉ từ <strong class="tnum">${formatVND(state.qty > 1 ? monthly : unitMonthly)}/tháng</strong> (12 tháng) · Đã gồm VAT &amp; Sạc GaN ${model.ganWatt}`;

    els.heroFrame.dataset.finish = colorInfo.slug;
    els.heroFinishDot.style.backgroundColor = colorInfo.hex;
    els.heroFinishLabel.textContent = `${model.name} · Màu ${state.color} · Vỏ nhôm CNC ${model.weightLabel}`;

    els.heroChipCpu.textContent = model.shortCpu;
    els.heroChipDisplay.textContent = model.shortDisplay;
    els.heroChipBattery.textContent = model.shortBattery;
  }

  function syncPaymentGuide(totals) {
    if (state.payment === 'cod') {
      els.paymentGuide.textContent = 'Kiểm tra đúng số serial nguyên seal và chạy test màn hình, cấu hình 15 phút trước khi thanh toán.';
      els.submitBtnLabel.textContent = 'Hoàn tất đặt hàng ·';
      els.submitBtnPrice.textContent = formatVND(totals.finalTotal);
    } else if (state.payment === 'bank') {
      els.paymentGuide.innerHTML = 'Giảm trực tiếp <strong class="tnum">300.000đ</strong>. Mã VietQR và thông tin tài khoản chính chủ ApexStore sẽ hiển thị ngay sau khi bạn bấm đặt hàng.';
      els.submitBtnLabel.textContent = 'Đặt & lấy mã VietQR ·';
      els.submitBtnPrice.textContent = formatVND(totals.finalTotal);
    } else {
      els.paymentGuide.innerHTML = `Thẻ tín dụng (28 ngân hàng): trả trước 0đ, góp <strong class="tnum">${formatVND(totals.monthly)}/tháng</strong> × 12 tháng. Hoặc qua CCCD gắn chip: trả trước 20% (<strong class="tnum">${formatVND(totals.cccdUpfront)}</strong>), duyệt online 5 phút.`;
      els.submitBtnLabel.textContent = 'Trả góp 0% ·';
      els.submitBtnPrice.textContent = `${formatVND(totals.monthly)}/tháng`;
    }
  }

  function syncCheckoutAndSticky() {
    const model = LAPTOP_MODELS[state.modelId];
    const totals = getTotals();

    els.checkoutModelBtns.forEach((btn) => {
      const selected = btn.dataset.model === state.modelId;
      btn.setAttribute('aria-checked', String(selected));
      btn.setAttribute('tabindex', selected ? '0' : '-1');
    });

    els.checkoutColorBtns.forEach((btn) => {
      const selected = btn.dataset.color === state.color;
      btn.setAttribute('aria-checked', String(selected));
      btn.setAttribute('tabindex', selected ? '0' : '-1');
    });

    renderTierButtons();

    els.qtyDisplay.textContent = String(state.qty);
    els.qtyMinus.disabled = state.qty <= 1;
    els.qtyPlus.disabled = state.qty >= 10;

    const configSummary = `${model.name} · ${totals.tier.label} · ${state.color} (×${state.qty})`;
    els.summaryConfig.textContent = configSummary;
    els.summaryListed.textContent = formatVND(totals.listedTotal);
    els.summarySavings.textContent = `−${formatVND(totals.savings)}`;
    els.summaryBankRow.hidden = totals.bankDiscount === 0;
    els.summaryShipping.textContent = CITY_SLA[state.city] || CITY_SLA.hn;
    els.summaryTotal.textContent = formatVND(totals.finalTotal);
    els.summaryMonthly.innerHTML = `Hoặc trả góp 0%: <strong class="tnum">${formatVND(totals.monthly)}/tháng</strong> (12 tháng)`;

    els.mobileRecapConfig.textContent = configSummary;
    els.mobileRecapTotal.textContent = formatVND(totals.finalTotal);

    syncPaymentGuide(totals);

    els.stickyModelName.textContent = `${model.name} (${totals.tier.label})`;
    els.stickyModelPrice.textContent = formatVND(totals.finalTotal);
  }

  function syncTechSpecs(modelId) {
    const specs = LAPTOP_MODELS[modelId].specs;
    els.specTabs.forEach((tab) => {
      const active = tab.dataset.specModel === modelId;
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
      if (active && els.specsPanel) {
        els.specsPanel.setAttribute('aria-labelledby', tab.id);
      }
    });
    document.getElementById('spec-cpu').textContent = specs.cpu;
    document.getElementById('spec-npu').textContent = specs.npu;
    document.getElementById('spec-gpu').textContent = specs.gpu;
    document.getElementById('spec-cooling').textContent = specs.cooling;
    document.getElementById('spec-screen').textContent = specs.screen;
    document.getElementById('spec-color').textContent = specs.color;
    document.getElementById('spec-ram').textContent = specs.ram;
    document.getElementById('spec-ssd').textContent = specs.ssd;
    document.getElementById('spec-ports').textContent = specs.ports;
    document.getElementById('spec-battery').textContent = specs.battery;
    document.getElementById('spec-weight').textContent = specs.weight;
  }

  function syncAllUI() {
    syncHero();
    syncCheckoutAndSticky();
    syncTechSpecs(state.modelId);
  }

  function selectModel(newModelId, source) {
    if (!LAPTOP_MODELS[newModelId]) return;
    const changed = state.modelId !== newModelId;
    state.modelId = newModelId;
    if (changed) state.tierIndex = 0;
    trackEvent('variant_select', { source, model: state.modelId });
    syncAllUI();
    saveDraft();
    pulsePriceFeedback(els.heroPriceCurrent);
    pulsePriceFeedback(els.summaryTotal);
  }

  // Event listeners: Hero & Checkout model selectors
  els.heroModelBtns.forEach((btn) => {
    btn.addEventListener('click', () => selectModel(btn.dataset.modelSelect, 'hero'));
  });

  els.checkoutModelBtns.forEach((btn) => {
    btn.addEventListener('click', () => selectModel(btn.dataset.model, 'checkout'));
  });

  // Comparison table buttons
  document.querySelectorAll('[data-choose-model]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectModel(btn.dataset.chooseModel, 'comparison_table');
      smoothScrollTo(document.getElementById('checkout'));
    });
  });

  // Tech Specs Tabs -> Two-way sync with state.modelId
  els.specTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      trackEvent('specs_tab_switch', { model: tab.dataset.specModel });
      selectModel(tab.dataset.specModel, 'specs_tab');
    });
  });

  // Color buttons
  els.checkoutColorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.color = btn.dataset.color;
      trackEvent('variant_select', { type: 'color', color: state.color });
      syncAllUI();
      saveDraft();
    });
  });

  // Quantity Stepper
  els.qtyMinus.addEventListener('click', () => {
    if (state.qty > 1) {
      state.qty -= 1;
      trackEvent('variant_select', { type: 'quantity', qty: state.qty });
      syncAllUI();
      saveDraft();
      pulsePriceFeedback(els.summaryTotal);
    }
  });

  els.qtyPlus.addEventListener('click', () => {
    if (state.qty < 10) {
      state.qty += 1;
      trackEvent('variant_select', { type: 'quantity', qty: state.qty });
      syncAllUI();
      saveDraft();
      pulsePriceFeedback(els.summaryTotal);
    }
  });

  // Payment method change
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      state.payment = e.target.value;
      trackEvent('variant_select', { type: 'payment', payment: state.payment });
      syncAllUI();
      saveDraft();
      pulsePriceFeedback(els.summaryTotal);
    });
  });

  // City SLA change
  if (els.citySelect) {
    els.citySelect.addEventListener('change', (e) => {
      state.city = e.target.value;
      syncCheckoutAndSticky();
      saveDraft();
    });
  }

  // Roving keyboard arrow navigation for role="radiogroup" & role="tablist"
  function attachRovingKeyNav(containerSelector, itemSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const items = Array.from(container.querySelectorAll(itemSelector));
      if (items.length === 0) return;
      const idx = items.indexOf(document.activeElement);
      if (idx === -1) return;

      e.preventDefault();
      let next = idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % items.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + items.length) % items.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = items.length - 1;

      items[next].focus();
      items[next].click();
    });
  }

  attachRovingKeyNav('.hero-models', '[data-model-select]');
  attachRovingKeyNav('.specs-tabs', '[data-spec-model]');
  attachRovingKeyNav('#checkout-model-group', '[data-model]');
  attachRovingKeyNav('#checkout-tier-group', '[data-tier-index]');
  attachRovingKeyNav('#checkout-color-group', '[data-color]');

  // Comparison "Show differences only" toggle
  const diffToggle = document.getElementById('toggle-diff-only');
  if (diffToggle) {
    diffToggle.addEventListener('change', () => {
      document.querySelectorAll('.compare-row--same').forEach((row) => {
        row.classList.toggle('is-hidden', diffToggle.checked);
      });
      trackEvent('comparison_diff_toggle', { diffOnly: diffToggle.checked });
      refreshScrollTriggers();
    });
  }

  // CTA Tracking
  document.querySelectorAll('[data-track-cta]').forEach((cta) => {
    cta.addEventListener('click', () => {
      trackEvent('cta_click', { location: cta.dataset.trackCta, model: state.modelId });
    });
  });

  // ========================================================================
  // Accessible Accordions (Tech Specs & FAQ)
  // ========================================================================
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;

      trackEvent('accordion_toggle', { id: trigger.id, expanded: !expanded });
      refreshScrollTriggers();
    });
  });

  // ========================================================================
  // Order Form Validation, Draft Save & Non-Destructive Edit Flow
  // ========================================================================
  const orderForm = document.getElementById('order-form');
  const errorSummary = document.getElementById('form-error-summary');
  const errorSummaryList = document.getElementById('error-summary-list');
  const successBox = document.getElementById('order-success-box');
  const successSummary = document.getElementById('order-success-summary');
  const paymentNextBox = document.getElementById('order-payment-next');
  const editOrderBtn = document.getElementById('order-edit-btn');
  const newOrderBtn = document.getElementById('order-new-btn');

  function normalizeVNPhone(raw) {
    let cleaned = raw.replace(/[\s.()-]/g, '');
    if (cleaned.startsWith('+84')) cleaned = '0' + cleaned.slice(3);
    else if (cleaned.startsWith('84') && cleaned.length >= 10) cleaned = '0' + cleaned.slice(2);
    return cleaned;
  }

  const fields = {
    name: {
      input: document.getElementById('customer-name'),
      err: document.getElementById('err-name'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Vui lòng nhập họ và tên người nhận (tối thiểu 2 ký tự).'
    },
    phone: {
      input: document.getElementById('customer-phone'),
      err: document.getElementById('err-phone'),
      validate: (val) => {
        const normalized = normalizeVNPhone(val);
        const isMobile = /^0(3|5|7|8|9)\d{8}$/.test(normalized);
        const isLandline = /^02\d{8,9}$/.test(normalized);
        return (isMobile || isLandline)
          ? ''
          : 'Vui lòng nhập số điện thoại Việt Nam hợp lệ (VD: 0912345678 hoặc 02439998888).';
      }
    },
    address: {
      input: document.getElementById('customer-address'),
      err: document.getElementById('err-address'),
      validate: (val) => val.trim().length >= 8 ? '' : 'Vui lòng nhập đầy đủ số nhà, tên đường và phường/quận giao máy.'
    }
  };

  function validateSingleField({ input, err, validate }) {
    const message = validate(input.value);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      err.textContent = message;
      err.hidden = false;
      return message;
    }
    input.removeAttribute('aria-invalid');
    err.textContent = '';
    err.hidden = true;
    return '';
  }

  Object.values(fields).forEach((fieldObj) => {
    const { input } = fieldObj;
    input.addEventListener('input', () => {
      if (!state.formStarted) {
        state.formStarted = true;
        trackEvent('form_start', { model: state.modelId });
      }
      saveDraft();
      if (input.getAttribute('aria-invalid') === 'true') {
        validateSingleField(fieldObj);
      }
    });

    input.addEventListener('blur', () => {
      if (input.value.trim().length > 0) {
        validateSingleField(fieldObj);
      }
    });
  });

  document.getElementById('customer-note')?.addEventListener('input', saveDraft);

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];

    Object.values(fields).forEach((fieldObj) => {
      const msg = validateSingleField(fieldObj);
      if (msg) errors.push({ id: fieldObj.input.id, message: msg });
    });

    if (errors.length > 0) {
      errorSummaryList.innerHTML = errors.map(
        (item) => `<li><a href="#${item.id}">${item.message}</a></li>`
      ).join('');
      errorSummary.hidden = false;
      errorSummary.focus();

      errorSummaryList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (ev) => {
          ev.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) target.focus();
        });
      });

      trackEvent('form_validation_error', { errorCount: errors.length });
      return;
    }

    errorSummary.hidden = true;
    state.formSubmitted = true;

    const model = LAPTOP_MODELS[state.modelId];
    const totals = getTotals();
    const orderCode = `APX-${String(Math.floor(100000 + Math.random() * 900000))}`;
    const cityLabel = els.citySelect?.options[els.citySelect.selectedIndex]?.text || '';

    trackEvent('purchase_submit', {
      orderCode,
      model: model.name,
      tier: totals.tier.label,
      color: state.color,
      qty: state.qty,
      payment: state.payment,
      city: state.city,
      total: totals.finalTotal
    });

    successSummary.innerHTML = `
      Mã đơn hàng: <strong class="tnum">${orderCode}</strong><br>
      Sản phẩm: <strong>${model.name} (${totals.tier.label} · ${state.color}) × ${state.qty}</strong><br>
      Tổng thanh toán: <strong class="tnum">${formatVND(totals.finalTotal)}</strong><br>
      Người nhận: <strong>${fields.name.input.value.trim()}</strong> — <span class="tnum">${normalizeVNPhone(fields.phone.input.value)}</span><br>
      Địa chỉ: ${fields.address.input.value.trim()} (${cityLabel})
    `;

    if (state.payment === 'bank') {
      paymentNextBox.hidden = false;
      paymentNextBox.innerHTML = `
        <strong>Hướng dẫn chuyển khoản giảm 300.000đ:</strong><br>
        Ngân hàng Techcombank · STK: <strong class="tnum">1903 8888 6868</strong> · Chủ TK: <strong>APEXSTORE VIETNAM</strong><br>
        Nội dung chuyển khoản: <strong class="tnum">${orderCode}</strong> · Số tiền: <strong class="tnum">${formatVND(totals.finalTotal)}</strong>
      `;
    } else if (state.payment === 'installment') {
      paymentNextBox.hidden = false;
      paymentNextBox.innerHTML = `
        <strong>Bước tiếp theo cho hồ sơ trả góp 0%:</strong><br>
        Chuyên viên sẽ gọi trong 5 phút để gửi link thanh toán thẻ tín dụng (<strong class="tnum">${formatVND(totals.monthly)}/tháng</strong>) hoặc xác thực CCCD online.
      `;
    } else {
      paymentNextBox.hidden = false;
      paymentNextBox.innerHTML = `
        <strong>Thanh toán khi nhận hàng (COD):</strong><br>
        Bạn kiểm tra đúng serial, bật máy test màn hình &amp; cấu hình 15 phút rồi mới thanh toán cho kỹ thuật viên giao hàng.
      `;
    }

    orderForm.hidden = true;
    successBox.hidden = false;
    successBox.focus();
  });

  // Non-destructive edit back to form
  editOrderBtn.addEventListener('click', () => {
    state.formSubmitted = false;
    successBox.hidden = true;
    orderForm.hidden = false;
    fields.name.input.focus();
  });

  // Clean new order
  newOrderBtn.addEventListener('click', () => {
    orderForm.reset();
    try { localStorage.removeItem(DRAFT_KEY); } catch (_) {}
    state.formStarted = false;
    state.formSubmitted = false;
    state.payment = 'cod';
    state.city = 'hn';
    successBox.hidden = true;
    orderForm.hidden = false;
    syncAllUI();
    fields.name.input.focus();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && state.formStarted && !state.formSubmitted) {
      trackEvent('form_abandon', {
        model: state.modelId,
        tier: getSelectedTier().id,
        filledFields: Object.keys(fields).filter((k) => fields[k].input.value.trim().length > 0)
      });
    }
  });

  // ========================================================================
  // Hide Mobile Sticky Bar Inside #checkout Viewport
  // ========================================================================
  function initStickyBarVisibility() {
    const checkoutEl = document.getElementById('checkout');
    if (!checkoutEl || !els.stickyBar || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          els.stickyBar.classList.toggle('is-hidden-in-checkout', entry.isIntersecting);
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(checkoutEl);
  }

  // ========================================================================
  // Motion Design & GSAP Choreography (ScrollTrigger + ScrollToPlugin)
  // ========================================================================
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function refreshScrollTriggers() {
    if (typeof window.ScrollTrigger !== 'undefined') {
      window.ScrollTrigger.refresh();
    }
  }

  function pulsePriceFeedback(el) {
    if (!el || prefersReducedMotion() || typeof window.gsap === 'undefined') return;
    window.gsap.fromTo(
      el,
      { y: 4, autoAlpha: 0.72 },
      { y: 0, autoAlpha: 1, duration: 0.22, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform' }
    );
  }

  function smoothScrollTo(targetEl) {
    if (!targetEl) return;
    if (prefersReducedMotion() || typeof window.gsap === 'undefined' || typeof window.ScrollToPlugin === 'undefined') {
      targetEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    window.gsap.to(window, {
      duration: 0.72,
      scrollTo: { y: targetEl, offsetY: 84, autoKill: true },
      ease: 'power3.inOut',
      overwrite: 'auto'
    });
  }

  function initAnchorSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#main-content') return;
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        smoothScrollTo(target);
      });
    });
  }

  function initGsapMotion() {
    if (typeof window.gsap === 'undefined') return;

    const { gsap } = window;
    if (typeof window.ScrollTrigger !== 'undefined' && typeof window.ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    } else if (typeof window.ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(window.ScrollTrigger);
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 960px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        if (reduceMotion) return undefined;

        const progressEl = document.getElementById('scroll-progress');
        if (progressEl && typeof window.ScrollTrigger !== 'undefined') {
          gsap.to(progressEl, {
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

        // Authored Hero entrance (never hides elements before load)
        const heroTl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power3.out' } });
        heroTl
          .from('.hero-title, .hero-subtitle', {
            y: 14,
            opacity: 0,
            stagger: 0.06,
            clearProps: 'transform,opacity'
          })
          .from('.hero-models, .hero-pricing, .hero-cta-group', {
            y: 12,
            opacity: 0,
            stagger: 0.05,
            clearProps: 'transform,opacity'
          }, '-=0.32')
          .from('.hero-frame, .hero-finish-bar, .hero-spec-strip', {
            y: 16,
            scale: 0.985,
            opacity: 0,
            stagger: 0.06,
            clearProps: 'transform,opacity'
          }, '-=0.36');

        if (isDesktop && typeof window.ScrollTrigger !== 'undefined') {
          gsap.to('.hero-frame', {
            y: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6
            }
          });
        }

        if (typeof window.ScrollTrigger !== 'undefined') {
          gsap.from('.trust-item', {
            y: 12,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.trust-bar',
              start: 'top 90%',
              once: true
            }
          });

          // Subtle section reveals that never trap elements at opacity 0 on anchor jumps
          const revealNodes = gsap.utils.toArray('.reveal');
          revealNodes.forEach((node) => {
            gsap.from(node, {
              y: 16,
              opacity: 0,
              duration: 0.45,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: node,
                start: 'top 90%',
                once: true
              }
            });
          });
        }

        return undefined;
      }
    );

    window.addEventListener('load', refreshScrollTriggers, { once: true });
  }

  // ========================================================================
  // Light / Dark Theme Switcher
  // ========================================================================
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const sunIcon = btn.querySelector('.theme-icon--sun');
    const moonIcon = btn.querySelector('.theme-icon--moon');
    const label = document.getElementById('theme-toggle-label');

    function applyTheme(theme) {
      const isLight = theme === 'light';
      document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
      btn.setAttribute('aria-pressed', String(isLight));
      btn.setAttribute('aria-label', isLight ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
      if (sunIcon) sunIcon.hidden = isLight;
      if (moonIcon) moonIcon.hidden = !isLight;
      if (label) label.textContent = isLight ? 'Tối' : 'Sáng';
    }

    const initial = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    applyTheme(initial);

    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('apexstore_theme_v1', next); } catch (_) {}
      trackEvent('theme_toggle', { theme: next });
    });
  }

  // Initial Hydrate
  initThemeToggle();
  loadDraft();
  syncAllUI();
  initStickyBarVisibility();
  initAnchorSmoothScroll();
  initGsapMotion();
  trackEvent('page_view', { page: 'laptop_landing_pro' });
})();
