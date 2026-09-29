// Loaded after config.js, data.js and photos.js (classic deferred scripts, so the site also opens straight from a file).
(() => {
const CONFIG = DIVINE_CONFIG;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const escapeHtml = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

// Nested-safe body scroll lock (mobile menu, modal and lightbox can overlap).
let lockCount = 0;
function lockScroll() {
  if (lockCount++ === 0) {
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = gap > 0 ? `${gap}px` : "";
    document.body.classList.add("scroll-locked");
  }
}
function unlockScroll() {
  if (lockCount === 0) return;
  if (--lockCount === 0) {
    document.body.classList.remove("scroll-locked");
    document.body.style.paddingRight = "";
  }
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Keeps Tab / Shift+Tab inside `container`.
function trapFocus(container, event) {
  if (event.key !== "Tab") return;
  const items = $$(FOCUSABLE, container).filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url; // popup blocked
}

// Today as YYYY-MM-DD in the visitor's local time zone.
function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

// Joins "Label: value" lines, skipping empty values.
const lines = (pairs) =>
  pairs.filter(([, v]) => v !== undefined && String(v).trim() !== "").map(([k, v]) => `${k}: ${String(v).trim()}`);

/* ------------------------------------------------------------------
   Images: <picture> with WebP srcset when optimised sizes exist,
   plain <img> otherwise, placeholder when there is no photo yet.
   ------------------------------------------------------------------ */
function pictureHtml(src, alt, sizes, { eager = false } = {}) {
  const meta = PHOTOS[src];
  const loading = eager ? "" : ' loading="lazy"';
  if (!meta) {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${loading} decoding="async">`;
  }
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const set = (ext) => meta.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  return `<picture>
      <source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">
      <img src="${escapeHtml(src)}" srcset="${set("jpg")}" sizes="${sizes}" width="${meta.width}" height="${meta.height}"
           alt="${escapeHtml(alt)}"${loading} decoding="async">
    </picture>`;
}

// Lets long filenames wrap after "/" and "-" rather than mid-word.
const breakable = (path) => escapeHtml(path).replace(/([/-])/g, "$1<wbr>");

function placeholderHtml(label, hint) {
  return `<div class="media-placeholder" role="img" aria-label="${escapeHtml(label)}, photo coming soon">
      <span class="media-placeholder-label" aria-hidden="true">${escapeHtml(label)}</span>
      ${hint ? `<span class="media-placeholder-file" aria-hidden="true">${breakable(hint)}</span>` : ""}
    </div>`;
}

function mediaHtml(item, label, sizes) {
  return item.image ? pictureHtml(item.image, item.alt || label, sizes) : placeholderHtml(label, item.imageHint);
}

// Largest available file for the lightbox.
function largestSrc(src) {
  const meta = PHOTOS[src];
  if (!meta) return { src, width: undefined, height: undefined };
  const w = meta.widths[meta.widths.length - 1];
  return { src: src.replace(/\.(jpe?g|png)$/i, `-${w}.webp`), fallback: src, width: meta.width, height: meta.height };
}

/* ------------------------------------------------------------------
   Config-driven contact details
   ------------------------------------------------------------------ */
function waMessage(context) {
  return `Hello ${CONFIG.businessName}, I'd like to enquire about ${context}.`;
}

function applyConfig() {
  $$("[data-wa]").forEach((a) => {
    a.href = buildWhatsAppUrl(waMessage(a.dataset.wa));
  });

  $$("[data-phones]").forEach((el) => {
    el.innerHTML = CONFIG.phones
      .map((p) => `<a href="tel:${escapeHtml(p.href)}">${escapeHtml(p.display)}</a>`)
      .join(el.tagName === "P" ? "<br>" : "");
  });

  $$("a[data-email]").forEach((a) => {
    a.href = `mailto:${CONFIG.email}`;
    a.textContent = CONFIG.email;
  });

  $$("a[data-instagram]").forEach((a) => {
    a.href = CONFIG.instagramUrl;
    if (!("keepText" in a.dataset)) a.textContent = CONFIG.instagramHandle;
    a.setAttribute("aria-label", `${CONFIG.businessName} on Instagram (${CONFIG.instagramHandle})`);
  });

  $$("[data-address]").forEach((el) => {
    el.innerHTML = CONFIG.addressLines.map(escapeHtml).join("<br>");
  });

  $$("[data-tagline]").forEach((el) => (el.textContent = CONFIG.tagline));
  $$("[data-business-name]").forEach((el) => (el.textContent = CONFIG.businessName));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Structured data, generated from the same config so details are never duplicated.
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${location.origin}/#business`,
    name: CONFIG.businessName,
    slogan: CONFIG.tagline,
    description:
      "Elegant wedding, party and event rentals, luxury tablescapes, dinnerware, glassware, furniture and event styling in Lagos.",
    url: `${location.origin}/`,
    image: `${location.origin}/images/og-image.jpg`,
    logo: `${location.origin}/icon-512.png`,
    telephone: CONFIG.phones.map((p) => p.href),
    email: CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONFIG.addressLines.slice(0, 2).join(" ").replace(/,\s*$/, ""),
      addressLocality: "Victoria Island",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    areaServed: { "@type": "City", name: "Lagos" },
    sameAs: [CONFIG.instagramUrl],
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
}

/* ------------------------------------------------------------------
   Header: scroll state + mobile navigation
   ------------------------------------------------------------------ */
function initHeader() {
  const header = $("#site-header");
  const toggle = $(".nav-toggle", header);
  const nav = $("#primary-nav");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  requestAnimationFrame(update);

  const isOpen = () => header.classList.contains("nav-open");

  const setOpen = (open, { restoreFocus = true } = {}) => {
    if (open === isOpen()) return;
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      lockScroll();
      $("a", nav)?.focus({ preventScroll: true });
    } else {
      unlockScroll();
      if (restoreFocus) toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener("click", () => setOpen(!isOpen()));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false, { restoreFocus: false });
  });
  header.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") setOpen(false);
    else trapFocus(header, e);
  });
  mobileQuery.addEventListener("change", (e) => {
    if (!e.matches) setOpen(false, { restoreFocus: false });
  });
}

/* ------------------------------------------------------------------
   Renderers
   ------------------------------------------------------------------ */
function renderServices() {
  $("#services-grid").innerHTML = SERVICES.map((s) => `
    <li data-animate>
      <article class="service-card">
        <div class="media">${mediaHtml(s, s.name, "(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 290px")}</div>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.description)}</p>
        <a class="card-link" href="#rentals" aria-label="Learn more about ${escapeHtml(s.name)}">Learn More</a>
      </article>
    </li>`).join("");
}

function renderRentals() {
  $("#rentals-grid").innerHTML = RENTALS.map((r, i) => `
    <li class="filterable" data-category="${escapeHtml(r.category)}" data-animate>
      <article class="rental-card">
        <div class="media">${mediaHtml(r, r.name, "(max-width: 520px) 92vw, (max-width: 1100px) 45vw, 280px")}</div>
        <div class="rental-body">
          <h3>${escapeHtml(r.name)}</h3>
          <p>${escapeHtml(r.description)}</p>
          <p class="price-note">Request price</p>
          <button class="btn btn-request btn-block" type="button" data-request="${i}"
                  aria-label="Request ${escapeHtml(r.name)}">Request This Item</button>
        </div>
      </article>
    </li>`).join("");
}

function renderTablescapes() {
  $("#tablescapes-grid").innerHTML = TABLESCAPES.map((t) => `
    <li data-animate>
      <article class="tablescape-card">
        <div class="media">${mediaHtml(t, t.name, "(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 230px")}</div>
        <h3>${escapeHtml(t.name)}</h3>
        <p>${escapeHtml(t.description)}</p>
        <a class="btn btn-style" href="#contact" data-style="${escapeHtml(t.name)}"
           aria-label="Create the ${escapeHtml(t.name)} look">Create This Look</a>
      </article>
    </li>`).join("");
}

function renderGallery() {
  $("#gallery-grid").innerHTML = GALLERY.map((g, i) => `
    <li class="filterable" data-category="${escapeHtml(g.category)}" data-animate>
      <div class="gallery-tile" role="button" tabindex="0" data-index="${i}" aria-label="View ${escapeHtml(g.caption)}">
        <div class="media">${mediaHtml(g, g.caption, "(max-width: 640px) 46vw, (max-width: 1100px) 30vw, 230px")}</div>
        <span class="gallery-caption" aria-hidden="true">${escapeHtml(g.caption)}</span>
      </div>
    </li>`).join("");
}

function renderSteps() {
  $("#steps-list").innerHTML = STEPS.map((s, i) => `
    <li class="step" data-animate>
      <span class="step-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <h3><span class="visually-hidden">Step ${i + 1}: </span>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.description)}</p>
    </li>`).join("");
}

function renderWhyUs() {
  $("#why-grid").innerHTML = WHY_US.map((w) => `
    <li class="why-item" data-animate>
      <h3>${escapeHtml(w.title)}</h3>
      <p>${escapeHtml(w.description)}</p>
    </li>`).join("");
}

/* ------------------------------------------------------------------
   Filter controller (shared by rentals and gallery)
   ------------------------------------------------------------------ */
function createFilter({ group, grid, categories, onChange }) {
  let active = "all";
  const timers = new WeakMap();

  group.innerHTML = categories.map((c) => `
    <button class="filter-btn" type="button" data-filter="${escapeHtml(c.id)}"
            aria-pressed="${c.id === "all"}">${escapeHtml(c.label)}</button>`).join("");

  const apply = (filter) => {
    if (filter === active) return;
    active = filter;
    $$(".filter-btn", group).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));

    const instant = reducedMotion.matches;
    $$(".filterable", grid).forEach((card) => {
      clearTimeout(timers.get(card));
      const match = filter === "all" || card.dataset.category === filter;

      if (instant) {
        card.hidden = !match;
        card.classList.remove("is-filtering-out", "is-filtering-in");
        if (match) revealNow(card);
        return;
      }

      if (match) {
        if (card.hidden) {
          card.classList.remove("is-filtering-out");
          card.classList.add("is-filtering-in");
          card.hidden = false;
          revealNow(card);
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove("is-filtering-in")));
        } else {
          card.classList.remove("is-filtering-out", "is-filtering-in");
        }
      } else if (!card.hidden) {
        card.classList.add("is-filtering-out");
        timers.set(card, setTimeout(() => {
          card.hidden = true;
          card.classList.remove("is-filtering-out");
        }, 320));
      }
    });
    onChange?.(filter);
  };

  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (btn) apply(btn.dataset.filter);
  });

  return { get active() { return active; } };
}

/* ------------------------------------------------------------------
   Request-this-item modal
   ------------------------------------------------------------------ */
function initRequestModal() {
  const modal = $("#request-modal");
  const panel = $(".modal-panel", modal);
  const form = $("#request-form");
  const note = $("#request-note");
  const itemField = $("#rq-item");
  let trigger = null;
  let closeTimer;

  $("#rq-date").min = todayISO();

  const open = (itemName, btn) => {
    clearTimeout(closeTimer);
    trigger = btn;
    form.reset();
    clearErrors(form);
    note.textContent = "";
    note.className = "form-note";
    itemField.value = itemName;
    $("#rq-date").min = todayISO();

    modal.hidden = false;
    lockScroll();
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("is-open")));
    $("#rq-name").focus({ preventScroll: true });
    panel.scrollTop = 0;
  };

  const close = () => {
    if (modal.hidden) return;
    modal.classList.remove("is-open");
    unlockScroll();
    closeTimer = setTimeout(() => { modal.hidden = true; }, reducedMotion.matches ? 0 : 350);
    trigger?.focus({ preventScroll: true });
  };

  $("#rentals-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-request]");
    if (btn) open(RENTALS[Number(btn.dataset.request)].name, btn);
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else trapFocus(panel, e);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = values(form);
    const errors = {};
    if (!v.name) errors.name = "Please enter your full name.";
    if (!validPhone(v.phone)) errors.phone = "Please enter a phone number we can reach you on.";
    if (v.email && !validEmail(v.email)) errors.email = "Please enter a valid email address, or leave it blank.";
    if (v.date && v.date < todayISO()) errors.date = "Please choose a date that hasn't passed.";
    if (v.guests && !(Number(v.guests) >= 1)) errors.guests = "Please enter at least 1 guest, or leave it blank.";

    if (showErrors(form, errors)) {
      note.className = "form-note";
      note.textContent = "Please fill in the highlighted fields.";
      return;
    }

    const message = [
      `Hello ${CONFIG.businessName}, I'd like to request a rental item.`,
      "",
      ...lines([
        ["Selected Rental", v.item],
        ["Name", v.name],
        ["Phone", v.phone],
        ["Email", v.email],
        ["Event Type", v.eventType],
        ["Event Date", formatDate(v.date)],
        ["Event Location", v.location],
        ["Number of Guests", v.guests],
        ["Additional Details", v.details],
      ]),
    ].join("\n");

    note.className = "form-note is-success";
    note.textContent = "Opening WhatsApp…";
    openWhatsApp(message);
    setTimeout(() => {
      form.reset();
      close();
    }, 600);
  });
}

/* ------------------------------------------------------------------
   Lightbox
   ------------------------------------------------------------------ */
function initLightbox(getFilter) {
  const box = $("#lightbox");
  const stage = $("#lightbox-stage");
  const caption = $("#lightbox-caption");
  const closeBtn = $(".lightbox-close", box);
  const grid = $("#gallery-grid");
  let list = [];
  let pos = 0;
  let trigger = null;
  let closeTimer;

  const visibleIndexes = () => {
    const f = getFilter();
    return GALLERY.map((g, i) => (f === "all" || g.category === f ? i : -1)).filter((i) => i >= 0);
  };

  const show = () => {
    const item = GALLERY[list[pos]];
    if (item.image) {
      const big = largestSrc(item.image);
      stage.innerHTML = `<picture>
          <source type="image/webp" srcset="${escapeHtml(big.src)}">
          <img src="${escapeHtml(big.fallback || big.src)}" alt="${escapeHtml(item.alt || item.caption)}"
               ${big.width ? `width="${big.width}" height="${big.height}"` : ""}>
        </picture>`;
    } else {
      stage.innerHTML = `<div class="media-placeholder" role="img" aria-label="${escapeHtml(item.caption)}, photo coming soon">
          <span class="media-placeholder-label" aria-hidden="true">Photo coming soon</span>
          <span class="media-placeholder-file" aria-hidden="true">${breakable(item.imageHint || "")}</span>
        </div>`;
    }
    caption.textContent = `${item.caption}  ·  ${pos + 1} / ${list.length}`;
  };

  const step = (dir) => {
    pos = (pos + dir + list.length) % list.length;
    show();
  };

  const open = (index, tile) => {
    clearTimeout(closeTimer);
    list = visibleIndexes();
    pos = Math.max(0, list.indexOf(index));
    trigger = tile;
    show();
    box.hidden = false;
    lockScroll();
    requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("is-open")));
    closeBtn.focus({ preventScroll: true });
  };

  const close = () => {
    if (box.hidden) return;
    box.classList.remove("is-open");
    unlockScroll();
    closeTimer = setTimeout(() => {
      box.hidden = true;
      stage.innerHTML = "";
    }, reducedMotion.matches ? 0 : 350);
    trigger?.focus({ preventScroll: true });
  };

  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".gallery-tile");
    if (tile) open(Number(tile.dataset.index), tile);
  });
  grid.addEventListener("keydown", (e) => {
    const tile = e.target.closest(".gallery-tile");
    if (tile && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open(Number(tile.dataset.index), tile);
    }
  });

  closeBtn.addEventListener("click", close);
  $(".lightbox-prev", box).addEventListener("click", () => step(-1));
  $(".lightbox-next", box).addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === stage || e.target.classList.contains("lightbox-figure")) close();
  });
  box.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else trapFocus(box, e);
  });

  let startX = null;
  let startY = null;
  box.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    startX = startY = null;
  }, { passive: true });
}

/* ------------------------------------------------------------------
   Forms
   ------------------------------------------------------------------ */
const values = (form) =>
  Object.fromEntries([...new FormData(form).entries()].map(([k, v]) => [k, String(v).trim()]));
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const validPhone = (v) => (v.match(/\d/g) || []).length >= 7;

function clearErrors(form) {
  $$(".field.has-error", form).forEach((f) => f.classList.remove("has-error"));
  $$(".field-error", form).forEach((p) => (p.textContent = ""));
  $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
}

// Shows each error under its field; returns true if there were errors (and focuses the first).
function showErrors(form, errors) {
  clearErrors(form);
  const names = Object.keys(errors);
  names.forEach((name) => {
    const input = form.elements[name];
    const field = input.closest(".field");
    field.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    document.getElementById(input.getAttribute("aria-describedby")).textContent = errors[name];
  });
  if (names.length) form.elements[names[0]].focus();
  return names.length > 0;
}

function clearFieldOnInput(form) {
  const handler = (e) => {
    const field = e.target.closest(".field");
    if (!field?.classList.contains("has-error")) return;
    field.classList.remove("has-error");
    e.target.removeAttribute("aria-invalid");
    const err = $(".field-error", field);
    if (err) err.textContent = "";
  };
  form.addEventListener("input", handler);
  form.addEventListener("change", handler);
}

function initContactForm() {
  const form = $("#contact-form");
  const note = $("#contact-note");
  const submit = $("button[type=submit]", form);
  const dateInput = $("#cf-date");
  dateInput.min = todayISO();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    dateInput.min = todayISO();
    const v = values(form);
    const errors = {};
    if (!v.name) errors.name = "Please enter your full name.";
    if (!validPhone(v.phone)) errors.phone = "Please enter a phone number we can reach you on.";
    if (v.email && !validEmail(v.email)) errors.email = "Please enter a valid email address, or leave it blank.";
    if (!v.eventType) errors.eventType = "Please choose an event type.";
    if (!v.date || v.date < todayISO()) errors.date = "Please choose your event date.";
    if (v.guests && !(Number(v.guests) >= 1)) errors.guests = "Please enter at least 1 guest, or leave it blank.";

    if (showErrors(form, errors)) {
      note.className = "form-note";
      note.textContent = "Please fill in the highlighted fields.";
      return;
    }

    const eventLines = lines([
      ["Name", v.name],
      ["Phone", v.phone],
      ["Email", v.email],
      ["Event Type", v.eventType],
      ["Date", formatDate(v.date)],
      ["Location", v.location],
      ["Guests", v.guests],
    ]);
    const extraLines = lines([
      ["Items/Services", v.items],
      ["Budget", v.budget],
      ["Additional Details", v.details],
    ]);
    const message = [
      `Hello ${CONFIG.businessName},`,
      "",
      "I would like to make an enquiry about an upcoming event.",
      "",
      ...eventLines,
      ...(extraLines.length ? ["", ...extraLines] : []),
      "",
      "Thank you.",
    ].join("\n");

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = "Preparing your message…";
    note.className = "form-note";
    note.textContent = "";

    setTimeout(() => {
      openWhatsApp(message);
      note.className = "form-note is-success";
      note.textContent = "Your enquiry is ready — continue in WhatsApp to send it.";
      submit.disabled = false;
      submit.textContent = label;
      form.reset();
    }, 500);
  });
}

/* ------------------------------------------------------------------
   In-page links: focus the contact form after scrolling there;
   "Create This Look" pre-fills the items field.
   ------------------------------------------------------------------ */
function initContactLinks() {
  const nameField = $("#cf-name");
  const itemsField = $("#cf-items");

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#contact"]');
    if (!link) return;

    const style = link.dataset.style;
    if (style && !itemsField.value.trim()) itemsField.value = `${style} tablescape`;

    setTimeout(() => nameField.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 550);
  });
}

// Marks the nav link for the section in view.
function initScrollSpy() {
  const links = $$(".nav-list a");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      map.get(entry.target.id)?.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}

/* ------------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------------ */
let revealObserver = null;

function revealNow(el) {
  if (!el.matches("[data-animate]") || el.classList.contains("is-revealed")) return;
  revealObserver?.unobserve(el);
  el.classList.remove("is-visible");
  el.classList.add("is-revealed");
}

function initReveal() {
  const items = $$("[data-animate]");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  // Stagger siblings within the same grid by ~60ms.
  items.forEach((el) => {
    const parent = el.parentElement;
    if (parent && parent.matches("ul, ol")) {
      const index = [...parent.children].indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 60}ms`);
    }
  });

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      revealObserver.unobserve(el);
      el.classList.add("is-visible");
      el.addEventListener("animationend", function done(ev) {
        if (ev.target !== el) return;
        el.removeEventListener("animationend", done);
        el.classList.remove("is-visible");
        el.classList.add("is-revealed");
        el.style.removeProperty("--reveal-delay");
      });
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  items.forEach((el) => revealObserver.observe(el));
}

/* ------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------ */
applyConfig();
renderServices();
renderRentals();
renderTablescapes();
renderGallery();
renderSteps();
renderWhyUs();

initHeader();
createFilter({ group: $("#rental-filters"), grid: $("#rentals-grid"), categories: RENTAL_CATEGORIES });
const galleryFilter = createFilter({ group: $("#gallery-filters"), grid: $("#gallery-grid"), categories: GALLERY_CATEGORIES });
initRequestModal();
initLightbox(() => galleryFilter.active);
initContactForm();
clearFieldOnInput($("#contact-form"));
clearFieldOnInput($("#request-form"));
initContactLinks();
initScrollSpy();
initReveal();

window.__divineReady = true;
})();
