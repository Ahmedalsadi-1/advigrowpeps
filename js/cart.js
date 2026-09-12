/* ADVIGROW PEPTIDES — cart (localStorage, no backend) */
(() => {
  "use strict";
  const KEY = "advigrow_cart_v1";
  const CATALOG = {
    "glp1-10": { id: "glp1-10", name: "GLP-1 Semaglutide", variant: "10 mg", price: 95, lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp1-5": { id: "glp1-5", name: "GLP-1 Semaglutide", variant: "5 mg", price: 58, lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp1-2": { id: "glp1-2", name: "GLP-1 Semaglutide", variant: "2 mg", price: 38, lot: "ADV-G1-1042", href: "product-glp1.html" },
    "glp2-10": { id: "glp2-10", name: "GLP-2 Teduglutide", variant: "10 mg", price: 120, lot: "ADV-G2-0871", href: "product-glp2.html" },
    "glp3-10": { id: "glp3-10", name: "GLP-3 Retatrutide", variant: "10 mg", price: 110, lot: "ADV-G3-0554", href: "product-glp3.html" },
  };
  // STRIPE TODO: paste Payment Links here after creating them in Stripe Dashboard.
  // See docs/SETUP-PAYMENTS-NOTIFICATIONS.md
  const STRIPE_LINKS = { "glp1-10": "", "glp2-10": "", "glp3-10": "" };
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
  }
  function remove(id) { save(load().filter((i) => i.id !== id)); render(); updateBadge(); }
  function setQty(id, qty) {
    let items = load();
    if (qty <= 0) items = items.filter((i) => i.id !== id);
    else items = items.map((i) => (i.id === id ? { ...i, qty } : i));
    save(items); render(); updateBadge();
  }
  function clear() { save([]); render(); updateBadge(); }

  function ensureUI() {
    if (document.getElementById("adv-cart-btn")) return;
    const btn = document.createElement("button");
    btn.id = "adv-cart-btn";
    btn.setAttribute("aria-label", "Open quote cart");
    btn.innerHTML = 'Quote (<span id="adv-cart-count">0</span>)';
    Object.assign(btn.style, { position: "fixed", bottom: "20px", right: "20px", zIndex: 60, background: "#CA8A04", color: "#0C0A09", border: "none", borderRadius: "999px", padding: "14px 22px", fontWeight: "700", cursor: "pointer", boxShadow: "0 10px 40px rgba(12,10,9,.25)" });
    btn.addEventListener("click", () => document.getElementById("adv-cart-drawer").style.display = "block");
    const drawer = document.createElement("div");
    drawer.id = "adv-cart-drawer";
    drawer.style.cssText = "display:none;position:fixed;top:0;right:0;width:min(420px,92vw);height:100%;background:#FAFAF9;color:#0C0A09;z-index:61;border-left:1px solid #E7E5E4;padding:24px;overflow:auto";
    drawer.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2 style="font-family:Playfair Display,serif">Quote request</h2><button id="adv-cart-close" aria-label="Close">×</button></div><div id="adv-cart-items" style="margin:20px 0"></div><div class="ruo-box" style="font-size:.8rem;border:1px solid #E7E5E4;padding:12px;margin-bottom:16px"><strong>Research Use Only.</strong> Not for human or veterinary use. Purchaser confirms qualified research end-user status at checkout.</div><div id="adv-cart-total" style="font-weight:700;margin-bottom:16px"></div><a id="adv-cart-checkout" href="checkout.html" style="display:block;text-align:center;background:#0C0A09;color:#FAFAF9;border-radius:999px;padding:14px;text-decoration:none;font-weight:600">Proceed to checkout</a><button id="adv-cart-clear" style="margin-top:10px;background:none;border:none;color:#57534E;cursor:pointer">Clear</button>';
    document.body.append(btn, drawer);
    drawer.querySelector("#adv-cart-close").addEventListener("click", () => (drawer.style.display = "none"));
    drawer.querySelector("#adv-cart-clear").addEventListener("click", clear);
  }
  function render() {
    ensureUI();
    const box = document.getElementById("adv-cart-items");
    const totalEl = document.getElementById("adv-cart-total");
    if (!box) return;
    const items = load();
    if (!items.length) { box.innerHTML = "<p style='color:#57534E'>Empty. Add a compound to request a quote.</p>"; totalEl.textContent = ""; return; }
    box.innerHTML = items.map((i) => {
      const p = CATALOG[i.id]; if (!p) return "";
      return `<div style="border-bottom:1px solid #E7E5E4;padding:12px 0;display:flex;justify-content:space-between;gap:12px"><div><strong>${p.name}</strong><div style="color:#57534E;font-size:.85rem">${p.variant} · Lot <span style="font-family:JetBrains Mono,monospace">${p.lot}</span></div><div>$${p.price} × <button data-dec="${i.id}">−</button> ${i.qty} <button data-inc="${i.id}">+</button></div></div><button data-rem="${i.id}" aria-label="Remove">×</button></div>`;
    }).join("");
    totalEl.textContent = `Estimated total: $${total().toFixed(2)} USD`;
    box.querySelectorAll("[data-rem]").forEach((b) => b.addEventListener("click", () => remove(b.dataset.rem)));
    box.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => setQty(b.dataset.inc, (load().find((x) => x.id === b.dataset.inc)?.qty || 0) + 1)));
    box.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => setQty(b.dataset.dec, (load().find((x) => x.id === b.dataset.dec)?.qty || 0) - 1)));
  }
  function updateBadge() { const el = document.getElementById("adv-cart-count"); if (el) el.textContent = count(); }

  // Wire legacy demo buttons: data-cart-add="glp1-10"
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-cart-add]");
    if (t) { e.preventDefault(); add(t.dataset.cartAdd, 1); window.advigrowToast?.(`${t.dataset.product || "Compound"} added to quote request.`); }
    const d = e.target.closest("[data-demo-action]");
    if (d && !d.hasAttribute("data-cart-add")) { e.preventDefault(); window.advigrowToast?.(`${d.dataset.product || "This compound"} — use Add to Quote on this page.`); }
  });

  window.AdvigrowCart = { add, remove, setQty, clear, load, total, count };
  ensureUI(); render(); updateBadge();
})();
