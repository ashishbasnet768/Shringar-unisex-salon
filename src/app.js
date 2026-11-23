import {
  LOOKBOOK_ITEMS,
  SALON_WHATSAPP_DISPLAY,
  SALON_WHATSAPP_NUMBER,
  STUDIO_CATEGORIES,
  STUDIO_PRODUCTS,
  TIME_SLOTS,
} from './data.js';

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

// Render Products Showcase grid (edited studio photography, brand + name only, no explanations or prices)
function renderProductsShowcase() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = STUDIO_PRODUCTS.map(
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
          <p class="eyebrow">${escapeHtml(item.brand)}</p>
          <h3 class="product-card-title">${escapeHtml(item.name)}</h3>
        </div>
      </article>`
  ).join('');
}

// Render dedicated Studio Service Page Grid + optional studio products & makeup packages (zero prices)
function renderDedicatedStudioPage(studioId) {
  const grid = document.getElementById('page-services-grid');
  const extras = document.getElementById('studio-extras');
  const cat = STUDIO_CATEGORIES.find((c) => c.id === studioId);
  if (!grid || !cat) return;

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

  grid.innerHTML = LOOKBOOK_ITEMS.map(
    (item) => `
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
        <span class="lookbook-cat">${escapeHtml(item.category)}</span>
      </button>`
  ).join('');
}

function openLookbookModal(lookId) {
  const item = LOOKBOOK_ITEMS.find((l) => l.id === lookId);
  const modal = document.getElementById('lookbook-modal');
  const body = document.getElementById('lookbook-modal-body');
  if (!item || !modal || !body) return;

  const allPhotos = [
    { src: item.image, label: item.title },
    ...item.galleryExtras,
  ];

  body.innerHTML = `
    <div class="lookbook-modal-grid">
      <div>
        <img
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(item.title)}"
          class="lookbook-main-img"
          id="lookbook-active-img"
          referrerpolicy="no-referrer"
        />
      </div>
      <div>
        <p class="eyebrow">${escapeHtml(item.category)}</p>
        <h3 class="modal-title" id="lookbook-modal-title">${escapeHtml(item.title)}</h3>
        <p class="modal-sub">${escapeHtml(item.caption)}</p>

        <p class="eyebrow">MORE FROM THE STUDIO</p>
        <div class="lookbook-thumbs">
          ${allPhotos
            .map(
              (entry, idx) => `
            <button
              type="button"
              class="lookbook-thumb-item ${idx === 0 ? 'active' : ''}"
              data-switch-thumb="${escapeHtml(entry.src)}"
              data-switch-label="${escapeHtml(entry.label)}"
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
}

function openBookingModal(preselectedService = '', mode = '') {
  const modal = document.getElementById('booking-modal');
  const body = document.getElementById('booking-modal-body');
  if (!modal || !body) return;

  const allServiceOptions = STUDIO_CATEGORIES.flatMap((cat) => [
    ...cat.services.map((s) => `${cat.title} — ${s.name}`),
    ...(cat.packages || []).map((p) => `${cat.title} — ${p.name}`),
  ]);

  body.innerHTML = `
    <p class="eyebrow">RESERVATIONS</p>
    <h3 class="modal-title" id="booking-modal-title">Book a visit at Shringar</h3>
    <p class="modal-sub">
      ${
        mode === 'whatsapp'
          ? 'Share your preferred service and time below to reserve your visit at Shringar.'
          : 'Choose your studio service, preferred date, and time. We will confirm your visit shortly.'
      }
    </p>

    <form id="visit-booking-form" class="booking-form" novalidate>
      <div class="form-field">
        <label for="visit-service" class="field-label">Service / Package *</label>
        <select id="visit-service" class="form-input" required>
          ${allServiceOptions
            .map((opt) => {
              const selected =
                preselectedService && opt.toLowerCase().includes(preselectedService.toLowerCase())
                  ? 'selected'
                  : '';
              return `<option value="${escapeHtml(opt)}" ${selected}>${escapeHtml(opt)}</option>`;
            })
            .join('')}
          ${
            preselectedService &&
            !allServiceOptions.some((o) =>
              o.toLowerCase().includes(preselectedService.toLowerCase())
            )
              ? `<option value="${escapeHtml(preselectedService)}" selected>${escapeHtml(
                  preselectedService
                )}</option>`
              : ''
          }
        </select>
      </div>

      <div class="form-row-2">
        <div class="form-field">
          <label for="visit-date" class="field-label">Preferred Date *</label>
          <input type="date" id="visit-date" class="form-input" min="${getDefaultDateIso()}" value="${getDefaultDateIso()}" required />
        </div>
        <div class="form-field">
          <label for="visit-time" class="field-label">Preferred Time *</label>
          <select id="visit-time" class="form-input" required>
            ${TIME_SLOTS.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}
          </select>
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
}

function closeAllModals() {
  ['lookbook-modal', 'booking-modal'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  });
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

  document.addEventListener('click', (e) => {
    const lookBtn = e.target.closest('[data-open-lookbook]');
    if (lookBtn) {
      openLookbookModal(lookBtn.getAttribute('data-open-lookbook'));
      return;
    }

    const thumbBtn = e.target.closest('[data-switch-thumb]');
    if (thumbBtn) {
      const mainImg = document.getElementById('lookbook-active-img');
      const bookBtn = document.getElementById('lookbook-book-btn');
      const src = thumbBtn.getAttribute('data-switch-thumb');
      const label = thumbBtn.getAttribute('data-switch-label');
      if (mainImg && src) mainImg.src = src;
      if (bookBtn && label) bookBtn.setAttribute('data-book-service-name', label);
      document.querySelectorAll('.lookbook-thumb-item').forEach((t) => {
        t.classList.toggle('active', t === thumbBtn);
      });
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
    if (e.key === 'Escape') closeAllModals();
  });
}

function bootstrap() {
  const pageType = document.body.getAttribute('data-page') || 'home';

  if (pageType === 'home') {
    renderStudioGrid();
    renderProductsShowcase();
    renderLookbookGrid();
  } else if (pageType === 'services') {
    renderStudioGrid();
    renderProductsShowcase();
  } else {
    renderDedicatedStudioPage(pageType);
  }

  initListeners();
}

bootstrap();
