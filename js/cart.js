/* ADVIGROW PEPTIDES — quote cart (localStorage, design-system drawer)
   Dosage-scaled: every vial size is its own catalog entry, so a larger
   select raises both the unit price and the line total. */
(() => {
  "use strict";
  const KEY = "advigrow_cart_v1";
  const CATALOG = {
    "glp1-2":  { base: "glp1", name: "GLP-1 Semaglutide", variant: "2 mg",  price: 38,  lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp1-5":  { base: "glp1", name: "GLP-1 Semaglutide", variant: "5 mg",  price: 58,  lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp1-10": { base: "glp1", name: "GLP-1 Semaglutide", variant: "10 mg", price: 95,  lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp1-20": { base: "glp1", name: "GLP-1 Semaglutide", variant: "20 mg", price: 170, lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp2-5":  { base: "glp2", name: "GLP-2 Teduglutide", variant: "5 mg",  price: 75,  lot: "ADV-G2-0871", href: "product-glp2.html" },
    "glp2-10": { base: "glp2", name: "GLP-2 Teduglutide", variant: "10 mg", price: 120, lot: "ADV-G2-0871", href: "product-glp2.html" },
    "glp2-20": { base: "glp2", name: "GLP-2 Teduglutide", variant: "20 mg", price: 215, lot: "ADV-G2-0871", href: "product-glp2.html" },
    "glp3-5":  { base: "glp3", name: "GLP-3 Retatrutide", variant: "5 mg",  price: 68,  lot: "ADV-G3-0554", href: "product-glp3.html" },
    "glp3-10": { base: "glp3", name: "GLP-3 Retatrutide", variant: "10 mg", price: 110, lot: "ADV-G3-0554", href: "product-glp3.html" },
    "glp3-20": { base: "glp3", name: "GLP-3 Retatrutide", variant: "20 mg", price: 195, lot: "ADV-G3-0554", href: "product-glp3.html" },
    "glp3-30": { base: "glp3", name: "GLP-3 Retatrutide", variant: "30 mg", price: 265, lot: "ADV-G3-0554", href: "product-glp3.html" },
  };
  // STRIPE TODO: paste Payment Links here keyed by catalog id (glp1-10, glp2-20, …)
  // after creating them in Stripe Dashboard. See docs/SETUP-PAYMENTS-NOTIFICATIONS.md
  const STRIPE_LINKS = Object.fromEntries(Object.keys(CATALOG).map((id) => [id, ""]));
  window.ADVIGROW_CATALOG = CATALOG;
  window.ADVIGROW_STRIPE_LINKS = STRIPE_LINKS;

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = (items) => localStorage.setItem(KEY, JSON.stringify(items));
  const count = () => load().reduce((n, i) => n + i.qty, 0);
  const total = () => load().reduce((s, i) => s + (CATALOG[i.id]?.price || 0) * i.qty, 0);

  function add(id, qty = 1) {
    if (!CATALOG[id]) return;
    const items = load();
    const found = items.find((i) => i.id === id);
    if (found) found.qty += qty; else items.push({ id, qty });
    save(items); render(); updateBadge();
    open();
  }
  function remove(id) { save(load().filter((i) => i.id !== id)); render(); updateBadge(); }
  function setQty(id, qty) {
    let items = load();
    if (qty <= 0) items = items.filter((i) => i.id !== id);
    else items = items.map((i) => (i.id === id ? { ...i, qty } : i));
    save(items); render(); updateBadge();
  }
  function clear() { save([]); render(); updateBadge(); }

  function resolveBaseId(base) {
    if (CATALOG[base]) return base;
    const select = document.querySelector(`select[data-size-select="${base}"]`);
    const mg = select ? parseInt(select.value, 10) : 10;
    const id = `${base}-${mg}`;
    return CATALOG[id] ? id : `${base}-10`;
  }

  function syncPriceLabels() {
    document.querySelectorAll("select[data-size-select]").forEach((select) => {
      const base = select.dataset.sizeSelect;
      const price = CATALOG[resolveBaseId(base)]?.price;
      if (!price) return;
      document.querySelectorAll(`[data-cart-add-base="${base}"]`).forEach((btn) => {
        btn.textContent = btn.textContent.replace(/— \$\d+(?:\.\d+)?$/, () => `— $${price}`);
      });
    });
  }

  function wireSizeSelectors() {
    document.querySelectorAll("select[data-size-select]").forEach((select) => {
      if (select.dataset.sizeWired) return;
      select.dataset.sizeWired = "1";
      select.addEventListener("change", syncPriceLabels);
    });
    syncPriceLabels();
  }

  let drawer, backdrop;

  function ensureUI() {
    if (drawer) return;
    ensureNavButton();
    backdrop = document.createElement("div");
    backdrop.className = "cart-backdrop";
    backdrop.id = "adv-cart-backdrop";
    drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.id = "adv-cart-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "Quote request");
    drawer.innerHTML = `
      <div class="cart-head">
        <h2 class="cart-title">Quote Request<small>Research Use Only · No card charged</small></h2>
        <button class="cart-close" id="adv-cart-close" aria-label="Close quote cart">&times;</button>
      </div>
      <div class="cart-items" id="adv-cart-items" aria-live="polite"></div>
      <div class="cart-foot" id="adv-cart-foot"></div>
    `;
    document.body.append(backdrop, drawer);

    backdrop.addEventListener("click", close);
    drawer.querySelector("#adv-cart-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) close();
    });

    drawer.addEventListener("click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const rem = e.target.closest("[data-rem]");
      if (inc) setQty(inc.dataset.inc, (load().find((x) => x.id === inc.dataset.inc)?.qty || 0) + 1);
      if (dec) setQty(dec.dataset.dec, (load().find((x) => x.id === dec.dataset.dec)?.qty || 0) - 1);
      if (rem) remove(rem.dataset.rem);
    });
  }

  let navBtnWired = false;
  function ensureNavButton() {
    let btn = document.getElementById("adv-cart-btn");
    if (!btn) {
      const actions = document.querySelector(".site-nav .nav-actions");
      if (!actions) return;
      btn = document.createElement("button");
      btn.id = "adv-cart-btn";
      btn.className = "nav-cart";
      actions.prepend(btn);
    }
    btn.setAttribute("aria-label", "Open quote cart");
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z" stroke-linejoin="round"/>
        <path d="M9 10V6a3 3 0 0 1 6 0v4" stroke-linecap="round"/>
      </svg>
      <span class="nav-cart-badge" id="adv-cart-count" aria-hidden="true">0</span>`;
    if (!navBtnWired) {
      btn.addEventListener("click", open);
      navBtnWired = true;
    }
  }

  function open() {
    ensureUI();
    closeMobileNav();
    render();
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    drawer.querySelector("#adv-cart-close").focus({ preventScroll: true });
  }
  function close() {
    if (!drawer) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    const burger = document.querySelector(".nav-burger");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  function render() {
    ensureUI();
    const box = document.getElementById("adv-cart-items");
    const foot = document.getElementById("adv-cart-foot");
    if (!box || !foot) return;
    const items = load();
    if (!items.length) {
      box.innerHTML = `
        <div class="cart-empty">
          <p class="serif">Your quote request is empty</p>
          <p>Add a compound to request a quote — a specialist confirms COA and stock within one business day.</p>
          <div class="cart-quick-adds">
            ${["glp1-10", "glp2-10", "glp3-10"].map((id) => {
              const p = CATALOG[id];
              return `<button class="cart-quick-add" data-cart-add="${id}" data-product="${p.name}">${p.name.split(" ")[0]} · $${p.price}</button>`;
            }).join("")}
          </div>
        </div>`;
      foot.innerHTML = `<a class="btn btn-gold cart-checkout" href="products.html">Browse the Collection</a>`;
      return;
    }
    box.innerHTML = items.map((i) => {
      const p = CATALOG[i.id]; if (!p) return "";
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name"><a href="${p.href}">${p.name}</a></div>
            <div class="cart-item-meta"><span class="mono">${p.variant}</span> · $${p.price}/vial</div>
            <div class="cart-item-meta cart-meta-lot">Lot <span class="mono">${p.lot}</span></div>
            <div class="cart-item-controls">
              <button class="cart-qty-btn" data-dec="${i.id}" aria-label="Decrease quantity">&minus;</button>
              <span class="cart-qty-val">${i.qty}</span>
              <button class="cart-qty-btn" data-inc="${i.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item-side">
            <span class="cart-item-price">$${(p.price * i.qty).toFixed(2)}</span>
            <button class="cart-item-remove" data-rem="${i.id}" aria-label="Remove ${p.name} ${p.variant}">&times;</button>
          </div>
        </div>`;
    }).join("");
    const n = count();
    foot.innerHTML = `
      <div class="cart-total-row"><span>Estimated total <small>· ${n} vial${n === 1 ? "" : "s"}</small></span><span>$${total().toFixed(2)} USD</span></div>
      <a class="btn btn-gold cart-checkout" href="checkout.html">Proceed to Checkout</a>
      <button class="cart-clear" id="adv-cart-clear">Clear request</button>
      <p class="cart-ruo">Qualified research end-users only (21+). Compounds for in-vitro laboratory research — not for human or veterinary use. RUO policy confirmed at checkout.</p>`;
    const clearBtn = foot.querySelector("#adv-cart-clear");
    if (clearBtn) clearBtn.addEventListener("click", clear);
  }

  function updateBadge() {
    ensureNavButton();
    const el = document.getElementById("adv-cart-count");
    if (!el) return;
    const n = count();
    const prev = el.textContent;
    el.textContent = n;
    el.classList.toggle("has-items", n > 0);
    if (n > 0 && prev !== String(n)) {
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
  }

  document.addEventListener("click", (e) => {
    const baseBtn = e.target.closest("[data-cart-add-base]");
    if (baseBtn) {
      e.preventDefault();
      add(resolveBaseId(baseBtn.dataset.cartAddBase), 1);
      window.advigrowToast?.(`${baseBtn.dataset.product || "Compound"} added to quote request.`);
      return;
    }
    const t = e.target.closest("[data-cart-add]");
    if (t) { e.preventDefault(); add(t.dataset.cartAdd, 1); window.advigrowToast?.(`${t.dataset.product || "Compound"} added to quote request.`); return; }
    const d = e.target.closest("[data-demo-action]");
    if (d && !d.hasAttribute("data-cart-add")) { e.preventDefault(); window.advigrowToast?.(`${d.dataset.product || "This compound"} — use Add to Quote on this page.`); }
  });

  window.AdvigrowCart = { add, remove, setQty, clear, load, total, count, open, close };
  ensureUI(); render(); updateBadge(); wireSizeSelectors();
})();
