(() => {
  const {
    LOOKBOOK_ITEMS,
    SALON_LOCATION,
    SALON_WHATSAPP_DISPLAY,
    SALON_WHATSAPP_NUMBER,
    STUDIO_CATEGORIES,
    STUDIO_PRODUCTS,
    TIME_SLOTS,
  } = window.SHRINGAR_DATA || {};

  if (!STUDIO_CATEGORIES) return;

  // Tier 1 Google Maps Platform quota & auth error monitoring
  let quotaBannerRendered = false;

  function showQuotaExceededBanner() {
    if (quotaBannerRendered) return;
    quotaBannerRendered = true;

    const renderBanner = () => {
      if (document.getElementById('gmp-quota-banner')) return;
      const banner = document.createElement('div');
      banner.id = 'gmp-quota-banner';
      banner.className = 'gmp-quota-banner';
      banner.setAttribute('role', 'status');

      const textSpan = document.createElement('span');
      textSpan.append('Google Maps Platform quota reached. If you are the app owner, visit ');

      const link = document.createElement('a');
      link.href =
        'https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'maps developer site';
      textSpan.appendChild(link);
      textSpan.append(' for instructions to update your account.');

      const dismissBtn = document.createElement('button');
      dismissBtn.type = 'button';
      dismissBtn.className = 'gmp-quota-dismiss';
      dismissBtn.setAttribute('aria-label', 'Dismiss notice');
      dismissBtn.textContent = 'Dismiss';
      dismissBtn.addEventListener('click', () => banner.remove());

      banner.append(textSpan, dismissBtn);
      document.body.prepend(banner);
    };

    if (document.body) {
      renderBanner();
    } else {
      document.addEventListener('DOMContentLoaded', renderBanner, { once: true });
    }
  }

  window.addEventListener('gmp-quota-exceeded', showQuotaExceededBanner);

  window.gm_authFailure = () => {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  };

  const origConsoleError = console.error;
  console.error = (...args) => {
    origConsoleError.apply(console, args);
    const msg = args.map((a) => String(a)).join(' ');
    if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  };

  function buildWhatsAppBookingUrl({ ref, service, date, time, name, phone, notes }) {
    const lines = [
      'Hello Shringar Unisex Salon & Makeup Studio!',
      'I would like to book an appointment:',
      `• Ref: #${ref}`,
      `• Service: ${service}`,
      `• Preferred Date: ${date}`,
      `• Preferred Time: ${time}`,
      `• Name: ${name}`,
      `• Phone: ${phone}`,
    ];
    if (notes) {
      lines.push(`• Notes: ${notes}`);
    }
    return `https://wa.me/${SALON_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function showToast(message) {
    const region = document.getElementById('toast-region');
    if (!region) return;
    const el = document.createElement('div');
    el.className = 'toast-item';
    el.textContent = message;
    region.appendChild(el);
    window.setTimeout(() => el.remove(), 3200);
  }

  function getDefaultDateIso() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function renderMotifArtwork(motif) {
    if (motif === 'men') {
      return `
        <div class="studio-motif-plate studio-motif-men">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#E7D2A2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
            <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
            <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
          </svg>
          <span class="motif-plate-caption">Men’s Grooming</span>
        </div>`;
    }
    if (motif === 'beauty') {
      return `
        <div class="studio-motif-plate studio-motif-beauty">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#E7D2A2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.4l-1.9-5.8L4 10.7l6.1-1.9z"></path>
          </svg>
          <span class="motif-plate-caption">Threading &amp; Waxing</span>
        </div>`;
    }
    return `
      <div class="studio-motif-plate studio-motif-facial">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#E7D2A2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2.5C15 7 18 10.2 18 14a6 6 0 1 1-12 0c0-3.8 3-7 6-11.5z"></path>
        </svg>
        <span class="motif-plate-caption">Facial &amp; Skin Glow</span>
      </div>`;
  }

  // Render 6 Studio Category Cards linking to their dedicated HTML pages
  function renderStudioGrid() {
    const grid = document.getElementById('studio-grid');
    if (!grid) return;

    grid.innerHTML = STUDIO_CATEGORIES.map((cat) => {
      const mediaHtml = cat.image
        ? `<img
            src="${escapeHtml(cat.image)}"
            alt="${escapeHtml(cat.title)} studio at Shringar"
            class="studio-card-img"
            style="object-position: ${escapeHtml(cat.imagePosition)};"
            referrerpolicy="no-referrer"
            loading="lazy"
          />`
        : renderMotifArtwork(cat.motif);

      return `
        <a href="${escapeHtml(cat.pageUrl)}" class="studio-card">
          <div class="studio-card-media">
            ${mediaHtml}
            <div class="studio-card-scrim"></div>
            <div class="studio-card-overlay">
              <span class="studio-card-index">${escapeHtml(cat.index)} / ${escapeHtml(cat.tags)}</span>
              <span class="studio-card-arrow" aria-hidden="true">↗</span>
            </div>
          </div>
          <h3 class="studio-card-title">${escapeHtml(cat.title)}</h3>
          <p class="studio-card-desc">${escapeHtml(cat.description)}</p>
          <span class="underline-cta">
            <span>${escapeHtml(cat.ctaLabel)}</span>
            <span aria-hidden="true">↗</span>
          </span>
        </a>`;
    }).join('');
  }

  // Render Products Showcase grid with brand filter bar (zero prices)
  let activeProductBrand = 'ALL';

  function getFilteredProducts() {
    if (activeProductBrand === 'ALL') return STUDIO_PRODUCTS;
    return STUDIO_PRODUCTS.filter((item) => item.brand === activeProductBrand);
  }

  function renderProductsShowcase() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filterHostId = 'product-filter-bar';
    let filterBar = document.getElementById(filterHostId);
    if (!filterBar) {
      filterBar = document.createElement('div');
      filterBar.id = filterHostId;
      filterBar.className = 'product-filter-bar';
      filterBar.setAttribute('role', 'group');
      filterBar.setAttribute('aria-label', 'Filter products by brand');
      grid.parentNode.insertBefore(filterBar, grid);
    }

    const brands = ['ALL', ...Array.from(new Set(STUDIO_PRODUCTS.map((p) => p.brand)))];
    filterBar.innerHTML = brands
      .map((brand) => {
        const label = brand === 'ALL' ? 'All Brands' : brand;
        const isActive = brand === activeProductBrand;
        return `
          <button
            type="button"
            class="product-filter-btn ${isActive ? 'is-active' : ''}"
            data-filter-brand="${escapeHtml(brand)}"
            aria-pressed="${isActive ? 'true' : 'false'}"
          >
            ${escapeHtml(label)}
          </button>`;
      })
      .join('');

    const items = getFilteredProducts();
    grid.innerHTML = items
      .map(
        (item) => `
        <article class="product-showcase-card">
          <div class="product-photo-wrap">
            <img
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.name)}"
              class="product-photo"
              referrerpolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div class="product-card-body">
            <div>
              <p class="eyebrow">${escapeHtml(item.brand)}</p>
              <h3 class="product-card-title">${escapeHtml(item.name)}</h3>
            </div>
            <button
              type="button"
              class="product-card-action"
              data-book-service-name="${escapeHtml(`Studio Product — ${item.brand} ${item.name}`)}"
            >
              <span>Enquire in studio</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>`
      )
      .join('');
  }

  // Render dedicated Studio Service Page Grid + optional studio products & makeup packages (zero prices)
  function renderDedicatedStudioPage(studioId) {
    const grid = document.getElementById('page-services-grid');
    const extras = document.getElementById('studio-extras');
    const cat = STUDIO_CATEGORIES.find((c) => c.id === studioId);
    if (!grid || !cat) return;

    grid.classList.toggle('is-three-col', cat.services.length === 3);

    grid.innerHTML = cat.services
      .map((srv) => {
        const photoHtml = srv.image
          ? `
            <div class="page-service-photo-wrap">
              <img
                src="${escapeHtml(srv.image)}"
                alt="${escapeHtml(srv.name)}"
                class="page-service-photo"
                style="object-position: ${escapeHtml(srv.imagePosition || 'center center')};"
                referrerpolicy="no-referrer"
              />
            </div>`
          : '';

        return `
          <article class="page-service-card">
            ${photoHtml}
            <div class="page-service-body">
              <div>
                <p class="page-service-tag">${escapeHtml(srv.tag)}</p>
                <h2 class="page-service-title">${escapeHtml(srv.name)}</h2>
                <p class="page-service-desc">${escapeHtml(srv.detail)}</p>
                <ul class="page-service-includes">
                  ${srv.includes.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
                </ul>
              </div>
              <div>
                <button
                  type="button"
                  class="underline-cta"
                  data-book-service-name="${escapeHtml(`${cat.title} — ${srv.name}`)}"
                >
                  <span>Book this service</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </article>`;
      })
      .join('');

    if (extras) {
      const blocks = [];

      if (cat.packages && cat.packages.length > 0) {
        blocks.push(`
          <div class="studio-extra-block">
            <p class="eyebrow">SPECIAL MAKEUP PACKAGES AVAILABLE</p>
            <h2 class="studio-extra-heading">
              Curated event <span class="heading-italic-burgundy">packages.</span>
            </h2>
            <div class="packages-grid">
              ${cat.packages
                .map(
                  (pkg) => `
                <article class="package-card">
                  <div>
                    <h3 class="package-card-title">${escapeHtml(pkg.name)}</h3>
                    <p class="package-card-desc">${escapeHtml(pkg.summary)}</p>
                  </div>
                  <button
                    type="button"
                    class="underline-cta"
                    data-book-service-name="${escapeHtml(`Makeup — ${pkg.name}`)}"
                  >
                    <span>Enquire for package</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </article>`
                )
                .join('')}
            </div>
          </div>`);
      }

      if (cat.productsUsed && cat.productsUsed.length > 0) {
        blocks.push(`
          <div class="studio-extra-block">
            <p class="eyebrow">PROFESSIONAL PRODUCTS USED</p>
            <h2 class="studio-extra-heading">${escapeHtml(cat.productsNote || 'Trusted studio brands.')}</h2>
            <div class="products-line-grid">
              ${cat.productsUsed
                .map((brand) => `<div class="product-line-item">${escapeHtml(brand)}</div>`)
                .join('')}
            </div>
          </div>`);
      }

      extras.innerHTML = blocks.join('');
      extras.hidden = blocks.length === 0;
    }
  }

  function renderLookbookGrid() {
    const grid = document.getElementById('lookbook-grid');
    if (!grid) return;

    grid.innerHTML = LOOKBOOK_ITEMS.map((item) => {
      const count = 1 + (item.galleryExtras?.length || 0);
      return `
        <button
          type="button"
          class="lookbook-card ${item.tall ? 'is-tall' : ''}"
          data-open-lookbook="${escapeHtml(item.id)}"
        >
          <div class="lookbook-photo-wrap">
            <img
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.title)}"
              class="lookbook-photo"
              style="object-position: ${escapeHtml(item.imagePosition)};"
              referrerpolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <h3 class="lookbook-title">${escapeHtml(item.title)}</h3>
          <div class="lookbook-meta-row">
            <span class="lookbook-cat">${escapeHtml(item.category)}</span>
            <span class="lookbook-count">${count} looks ↗</span>
          </div>
        </button>`;
    }).join('');
  }

  let activeLookbookPhotos = [];
  let activeLookbookIndex = 0;
  let lastFocusedBeforeModal = null;

  function setLookbookActiveIndex(nextIndex) {
    if (!activeLookbookPhotos.length) return;
    const total = activeLookbookPhotos.length;
    activeLookbookIndex = ((nextIndex % total) + total) % total;
    const current = activeLookbookPhotos[activeLookbookIndex];

    const mainImg = document.getElementById('lookbook-active-img');
    const bookBtn = document.getElementById('lookbook-book-btn');
    const counterEl = document.getElementById('lookbook-stage-counter');
    const captionLabel = document.getElementById('lookbook-active-label');

    if (mainImg && current) {
      mainImg.src = current.src;
      mainImg.alt = current.label;
    }
    if (bookBtn && current) {
      bookBtn.setAttribute('data-book-service-name', current.label);
    }
    if (counterEl) {
      counterEl.textContent = `${activeLookbookIndex + 1} / ${total}`;
    }
    if (captionLabel && current) {
      captionLabel.textContent = current.label;
    }
    document.querySelectorAll('.lookbook-thumb-item').forEach((thumbEl, idx) => {
      thumbEl.classList.toggle('active', idx === activeLookbookIndex);
    });
  }

  function openLookbookModal(lookId) {
    const item = LOOKBOOK_ITEMS.find((l) => l.id === lookId);
    const modal = document.getElementById('lookbook-modal');
    const body = document.getElementById('lookbook-modal-body');
    if (!item || !modal || !body) return;

    lastFocusedBeforeModal = document.activeElement;
    activeLookbookPhotos = [{ src: item.image, label: item.title }, ...item.galleryExtras];
    activeLookbookIndex = 0;

    body.innerHTML = `
      <div class="lookbook-modal-grid">
        <div class="lookbook-stage">
          <img
            src="${escapeHtml(item.image)}"
            alt="${escapeHtml(item.title)}"
            class="lookbook-main-img"
            id="lookbook-active-img"
            referrerpolicy="no-referrer"
          />
          <div class="lookbook-stage-nav">
            <button type="button" class="lookbook-nav-btn" id="lookbook-prev-btn" aria-label="Previous photo">
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </button>
            <span class="lookbook-stage-counter" id="lookbook-stage-counter">1 / ${activeLookbookPhotos.length}</span>
            <button type="button" class="lookbook-nav-btn" id="lookbook-next-btn" aria-label="Next photo">
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div>
          <p class="eyebrow">${escapeHtml(item.category)}</p>
          <h3 class="modal-title" id="lookbook-modal-title">${escapeHtml(item.title)}</h3>
          <p class="modal-sub">${escapeHtml(item.caption)}</p>
          <p class="eyebrow" id="lookbook-active-label">${escapeHtml(item.title)}</p>

          <div class="lookbook-thumbs">
            ${activeLookbookPhotos
              .map(
                (entry, idx) => `
              <button
                type="button"
                class="lookbook-thumb-item ${idx === 0 ? 'active' : ''}"
                data-switch-index="${idx}"
              >
                <img
                  src="${escapeHtml(entry.src)}"
                  alt="${escapeHtml(entry.label)}"
                  class="lookbook-thumb-img"
                  referrerpolicy="no-referrer"
                />
                <span class="lookbook-thumb-label">${escapeHtml(entry.label)}</span>
              </button>`
              )
              .join('')}
          </div>

          <div style="margin-top: 22px;">
            <button
              type="button"
              class="btn-burgundy"
              id="lookbook-book-btn"
              data-book-service-name="${escapeHtml(item.title)}"
            >
              <span>Book a visit for this look</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>`;

    modal.hidden = false;
    document.getElementById('lookbook-modal-close')?.focus();
  }

  function openBookingModal(preselectedService = '', mode = '') {
    const modal = document.getElementById('booking-modal');
    const body = document.getElementById('booking-modal-body');
    if (!modal || !body) return;

    lastFocusedBeforeModal = document.activeElement;

    const allFlatOptions = STUDIO_CATEGORIES.flatMap((cat) => [
      ...cat.services.map((s) => `${cat.title} — ${s.name}`),
      ...(cat.packages || []).map((p) => `${cat.title} — ${p.name}`),
    ]);

    const hasExactOrPartialMatch =
      Boolean(preselectedService) &&
      allFlatOptions.some((o) => o.toLowerCase().includes(preselectedService.toLowerCase()));

    let matchedAlready = false;
    const optgroupsHtml = STUDIO_CATEGORIES.map((cat) => {
      const options = [
        ...cat.services.map((s) => `${cat.title} — ${s.name}`),
        ...(cat.packages || []).map((p) => `${cat.title} — ${p.name}`),
      ];
      return `
        <optgroup label="${escapeHtml(cat.title)} Studio">
          ${options
            .map((opt) => {
              const isMatch =
                !matchedAlready &&
                preselectedService &&
                opt.toLowerCase().includes(preselectedService.toLowerCase());
              if (isMatch) matchedAlready = true;
              return `<option value="${escapeHtml(opt)}" ${isMatch ? 'selected' : ''}>${escapeHtml(opt)}</option>`;
            })
            .join('')}
        </optgroup>`;
    }).join('');

    body.innerHTML = `
      <p class="eyebrow">RESERVATIONS</p>
      <h3 class="modal-title" id="booking-modal-title">Book a visit at Shringar</h3>
      <p class="modal-sub">
        ${
          mode === 'whatsapp'
            ? 'Share your preferred service and time below to reserve your visit directly on WhatsApp.'
            : 'Choose your studio service, preferred date, and time. We will confirm your visit shortly.'
        }
      </p>

      <form id="visit-booking-form" class="booking-form" novalidate>
        <div class="form-field">
          <label for="visit-service" class="field-label">Service / Package *</label>
          <select id="visit-service" class="form-input" required>
            ${
              preselectedService && !hasExactOrPartialMatch
                ? `<option value="${escapeHtml(preselectedService)}" selected>${escapeHtml(preselectedService)}</option>`
                : ''
            }
            ${optgroupsHtml}
          </select>
        </div>

        <div class="form-field">
          <label for="visit-date" class="field-label">Preferred Date *</label>
          <input type="date" id="visit-date" class="form-input" min="${getDefaultDateIso()}" value="${getDefaultDateIso()}" required />
        </div>

        <div class="form-field">
          <span class="field-label" id="visit-time-label">Preferred Time *</span>
          <input type="hidden" id="visit-time" value="${escapeHtml(TIME_SLOTS[0])}" />
          <div class="time-slot-grid" role="group" aria-labelledby="visit-time-label">
            ${TIME_SLOTS.map(
              (t, idx) => `
              <button
                type="button"
                class="time-slot-btn ${idx === 0 ? 'is-selected' : ''}"
                data-select-time="${escapeHtml(t)}"
                aria-pressed="${idx === 0 ? 'true' : 'false'}"
              >
                ${escapeHtml(t)}
              </button>`
            ).join('')}
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-field">
            <label for="visit-name" class="field-label">Your Name *</label>
            <input type="text" id="visit-name" class="form-input" placeholder="Full name" required />
          </div>
          <div class="form-field">
            <label for="visit-phone" class="field-label">Phone / WhatsApp *</label>
            <input type="tel" id="visit-phone" class="form-input" placeholder="+977-98..." required />
          </div>
        </div>

        <div class="form-field">
          <label for="visit-notes" class="field-label">Notes (Optional)</label>
          <textarea id="visit-notes" rows="2" class="form-input" placeholder="Any preferences or occasion details..."></textarea>
        </div>

        <p class="form-error" id="visit-form-error" role="alert" hidden></p>

        <button type="submit" class="btn-burgundy" style="width: 100%;">
          <span>Send via WhatsApp (${escapeHtml(SALON_WHATSAPP_DISPLAY)})</span>
          <span aria-hidden="true">↗</span>
        </button>
      </form>`;

    modal.hidden = false;
    document.getElementById('visit-service')?.focus();
  }

  function closeAllModals() {
    let closedAny = false;
    ['lookbook-modal', 'booking-modal'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && !el.hidden) {
        el.hidden = true;
        closedAny = true;
      }
    });
    if (closedAny && lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  function initListeners() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const nextHidden = !mobileDrawer.hidden;
        mobileDrawer.hidden = nextHidden;
        mobileToggle.setAttribute('aria-expanded', String(!nextHidden));
      });
      mobileDrawer.querySelectorAll('a, button').forEach((item) => {
        item.addEventListener('click', () => {
          mobileDrawer.hidden = true;
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Zero-broken-image fallback for any failed media asset
    document.addEventListener(
      'error',
      (e) => {
        const img = e.target;
        if (!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied === 'true') return;
        img.dataset.fallbackApplied = 'true';
        const wrapper = img.parentElement;
        if (!wrapper) return;
        const fallback = document.createElement('div');
        fallback.className = 'img-fallback-plate';
        const title = document.createElement('span');
        title.className = 'img-fallback-title';
        title.textContent = img.alt || 'Shringar Studio';
        fallback.appendChild(title);
        img.replaceWith(fallback);
      },
      true
    );

    document.addEventListener('click', (e) => {
      const brandBtn = e.target.closest('[data-filter-brand]');
      if (brandBtn) {
        activeProductBrand = brandBtn.getAttribute('data-filter-brand') || 'ALL';
        renderProductsShowcase();
        return;
      }

      const timeBtn = e.target.closest('[data-select-time]');
      if (timeBtn) {
        const timeVal = timeBtn.getAttribute('data-select-time') || '';
        const hiddenInput = document.getElementById('visit-time');
        if (hiddenInput) hiddenInput.value = timeVal;
        document.querySelectorAll('[data-select-time]').forEach((btn) => {
          const selected = btn === timeBtn;
          btn.classList.toggle('is-selected', selected);
          btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        return;
      }

      if (e.target.closest('#lookbook-prev-btn')) {
        setLookbookActiveIndex(activeLookbookIndex - 1);
        return;
      }

      if (e.target.closest('#lookbook-next-btn')) {
        setLookbookActiveIndex(activeLookbookIndex + 1);
        return;
      }

      const lookBtn = e.target.closest('[data-open-lookbook]');
      if (lookBtn) {
        openLookbookModal(lookBtn.getAttribute('data-open-lookbook'));
        return;
      }

      const thumbBtn = e.target.closest('[data-switch-index]');
      if (thumbBtn) {
        const idx = Number(thumbBtn.getAttribute('data-switch-index'));
        if (!Number.isNaN(idx)) setLookbookActiveIndex(idx);
        return;
      }

      const bookServiceBtn = e.target.closest('[data-book-service-name]');
      if (bookServiceBtn) {
        const name = bookServiceBtn.getAttribute('data-book-service-name') || '';
        closeAllModals();
        openBookingModal(name);
        return;
      }

      const bookOpenBtn = e.target.closest('[data-open-booking]');
      if (bookOpenBtn) {
        const val = bookOpenBtn.getAttribute('data-open-booking') || '';
        const pageType = document.body.getAttribute('data-page') || 'home';
        const studioMatch = STUDIO_CATEGORIES.find((c) => c.id === pageType);
        if (val === 'whatsapp') {
          openBookingModal(studioMatch ? studioMatch.title : '', 'whatsapp');
        } else {
          openBookingModal(val || (studioMatch ? studioMatch.title : ''), '');
        }
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.id !== 'visit-booking-form') return;
      e.preventDefault();

      const service = document.getElementById('visit-service')?.value || '';
      const date = document.getElementById('visit-date')?.value || '';
      const time = document.getElementById('visit-time')?.value || '';
      const name = document.getElementById('visit-name')?.value.trim() || '';
      const phone = document.getElementById('visit-phone')?.value.trim() || '';
      const notes = document.getElementById('visit-notes')?.value.trim() || '';
      const errorEl = document.getElementById('visit-form-error');

      let err = '';
      if (name.length < 2) err = 'Please enter your name.';
      else if (phone.replace(/\D/g, '').length < 7) err = 'Please enter a valid phone number.';
      else if (!date) err = 'Please choose a preferred date.';

      if (err) {
        if (errorEl) {
          errorEl.textContent = err;
          errorEl.hidden = false;
        }
        return;
      }

      const ref = `SHR-${Math.floor(1000 + Math.random() * 9000)}`;
      const waUrl = buildWhatsAppBookingUrl({ ref, service, date, time, name, phone, notes });

      const body = document.getElementById('booking-modal-body');
      if (body) {
        body.innerHTML = `
          <p class="eyebrow">WHATSAPP BOOKING READY · #${escapeHtml(ref)}</p>
          <h3 class="modal-title" id="booking-modal-title">Send your booking on WhatsApp</h3>
          <p class="modal-sub">Your appointment details are ready to send directly to Shringar (${escapeHtml(SALON_WHATSAPP_DISPLAY)}).</p>
          <div class="receipt-box">
            <div><strong>Name:</strong> ${escapeHtml(name)}</div>
            <div><strong>Phone:</strong> ${escapeHtml(phone)}</div>
            <div><strong>Service:</strong> ${escapeHtml(service)}</div>
            <div><strong>Date &amp; Time:</strong> ${escapeHtml(date)} at ${escapeHtml(time)}</div>
            ${notes ? `<div><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ''}
          </div>
          <a
            href="${escapeHtml(waUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold-pill"
            id="whatsapp-launch-link"
            style="width: 100%; margin-bottom: 10px;"
          >
            <span>Open WhatsApp Chat (${escapeHtml(SALON_WHATSAPP_DISPLAY)})</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button type="button" class="btn-burgundy" id="receipt-done-btn" style="width: 100%;">
            Close
          </button>`;
        document.getElementById('receipt-done-btn')?.addEventListener('click', closeAllModals);
        document.getElementById('whatsapp-launch-link')?.click();
      }

      showToast(`WhatsApp booking #${ref} ready for ${SALON_WHATSAPP_DISPLAY}`);
    });

    ['lookbook-modal', 'booking-modal'].forEach((id) => {
      const modal = document.getElementById(id);
      modal?.addEventListener('click', (e) => {
        if (e.target.id === id) closeAllModals();
      });
    });

    document.getElementById('lookbook-modal-close')?.addEventListener('click', closeAllModals);
    document.getElementById('booking-modal-close')?.addEventListener('click', closeAllModals);

    document.addEventListener('keydown', (e) => {
      const lookbookModal = document.getElementById('lookbook-modal');
      if (lookbookModal && !lookbookModal.hidden) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setLookbookActiveIndex(activeLookbookIndex - 1);
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setLookbookActiveIndex(activeLookbookIndex + 1);
          return;
        }
      }
      if (e.key === 'Escape') closeAllModals();
    });
  }

  function renderMapFallback(mapEl) {
    mapEl.innerHTML = `
      <div class="location-map-fallback">
        <p class="eyebrow">SHRINGAR STUDIO PIN</p>
        <h3 class="location-map-fallback-title">${escapeHtml(SALON_LOCATION.name)}</h3>
        <p class="location-map-fallback-coords">${escapeHtml(SALON_LOCATION.coordsLabel)}</p>
        <a
          href="${escapeHtml(SALON_LOCATION.mapsUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-burgundy"
        >
          <span>Open in Google Maps</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>`;
  }

  // Official Google Maps JavaScript API dynamic library bootstrap (pure browser JS)
  function ensureGoogleMapsLoader(apiKey) {
    if (window.google?.maps?.importLibrary) return;
    ((g) => {
      let h;
      let a;
      let k;
      const p = 'The Google Maps JavaScript API';
      const c = 'google';
      const l = 'importLibrary';
      const q = '__ib__';
      const m = document;
      let b = window;
      b = b[c] || (b[c] = {});
      const d = b.maps || (b.maps = {});
      const r = new Set();
      const e = new URLSearchParams();
      const u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          await (a = m.createElement('script'));
          e.set('libraries', [...r] + '');
          for (k in g) {
            e.set(k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()), g[k]);
          }
          e.set('callback', c + '.maps.' + q);
          a.src = 'https://maps.' + c + 'apis.com/maps/api/js?' + e;
          d[q] = f;
          a.onerror = () => (h = n(new Error(p + ' could not load.')));
          a.nonce = m.querySelector('script[nonce]')?.nonce || '';
          m.head.append(a);
        }));
      if (d[l]) {
        console.warn(p + ' only loads once. Ignoring:', g);
      } else {
        d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
      }
    })({
      key: apiKey,
      v: 'weekly',
      language: 'en',
      region: 'NP',
    });
  }

  // Initialize interactive Google Map for Shringar Unisex Salon & Makeup Studio
  async function initStudioLocationMap() {
    const mapEl = document.getElementById('shringar-map');
    if (!mapEl) return;

    const metaKey = document.querySelector('meta[name="google-maps-api-key"]')?.getAttribute('content') || '';
    const apiKey = metaKey || window.GOOGLE_MAPS_API_KEY || '';
    if (!apiKey || apiKey === 'MY_GOOGLE_MAPS_API_KEY') {
      renderMapFallback(mapEl);
      return;
    }

    try {
      ensureGoogleMapsLoader(apiKey);

      const [{ Map, InfoWindow }, { AdvancedMarkerElement, PinElement }] = await Promise.all([
        window.google.maps.importLibrary('maps'),
        window.google.maps.importLibrary('marker'),
      ]);

      const position = { lat: SALON_LOCATION.lat, lng: SALON_LOCATION.lng };

      const map = new Map(mapEl, {
        center: position,
        zoom: 17,
        mapId: 'DEMO_MAP_ID',
        gestureHandling: 'cooperative',
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio'],
      });

      const pin = new PinElement({
        background: '#6E0F27',
        borderColor: '#CBB279',
        glyphColor: '#FAF8F6',
        scale: 1.2,
      });

      const marker = new AdvancedMarkerElement({
        map,
        position,
        content: pin.element,
        title: SALON_LOCATION.name,
        gmpClickable: true,
      });

      const headerEl = document.createElement('h3');
      headerEl.className = 'gmp-info-header';
      headerEl.textContent = SALON_LOCATION.name;

      const bodyEl = document.createElement('div');
      bodyEl.className = 'gmp-info-body';

      const coordsP = document.createElement('div');
      coordsP.textContent = `Coordinates: ${SALON_LOCATION.coordsLabel}`;

      const directionsLink = document.createElement('a');
      directionsLink.href = SALON_LOCATION.mapsUrl;
      directionsLink.target = '_blank';
      directionsLink.rel = 'noopener noreferrer';
      directionsLink.className = 'gmp-info-link';
      directionsLink.textContent = 'Get Directions on Google Maps ↗';

      bodyEl.append(coordsP, directionsLink);

      const infoWindow = new InfoWindow({
        headerContent: headerEl,
        content: bodyEl,
        ariaLabel: SALON_LOCATION.name,
        maxWidth: 280,
      });

      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });

      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    } catch (err) {
      const msg = String(err?.message || err || '');
      if (
        msg.includes('OVER_QUERY_LIMIT') ||
        msg.includes('RESOURCE_EXHAUSTED') ||
        msg.includes('OverQuotaMapError') ||
        msg.includes('QuotaExceededError')
      ) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
      renderMapFallback(mapEl);
    }
  }

  function bootstrap() {
    const pageType = document.body.getAttribute('data-page') || 'home';

    if (pageType === 'home') {
      renderStudioGrid();
      renderProductsShowcase();
      renderLookbookGrid();
      void initStudioLocationMap();
    } else if (pageType === 'services') {
      renderStudioGrid();
      renderProductsShowcase();
    } else {
      renderDedicatedStudioPage(pageType);
    }

    initListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
