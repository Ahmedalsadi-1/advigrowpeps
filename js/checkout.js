/* ADVIGROW checkout — Formspree-ready, Stripe-link ready */
(() => {
  "use strict";
  // TODO owner: paste Formspree endpoint, e.g. https://formspree.io/f/xxxx
  // Get one free at formspree.io, set destination to advigrow@gmail.com
  const FORMSPREE_ENDPOINT = "";
  const ORDERS_EMAIL = "advigrow@gmail.com";

  const form = document.getElementById("co-form");
  const box = document.getElementById("co-items");
  const totalEl = document.getElementById("co-total");
  const stripeBox = document.getElementById("stripe-links");
  if (!form || !box) return;

  function items() { return window.AdvigrowCart ? window.AdvigrowCart.load() : []; }
  function render() {
    const list = items();
    if (!list.length) { box.innerHTML = "<p style='color:var(--muted)'>Cart empty. <a href='products.html'>Browse collection</a></p>"; totalEl.textContent = ""; return; }
    box.innerHTML = list.map((i) => {
      const p = window.ADVIGROW_CATALOG[i.id]; if (!p) return "";
      return `<div style="display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--line)"><span>${p.name} · ${p.variant} × ${i.qty}</span><strong>$${(p.price * i.qty).toFixed(2)}</strong></div>`;
    }).join("");
    totalEl.textContent = `Estimated total: $${window.AdvigrowCart.total().toFixed(2)} USD`;
    const links = window.ADVIGROW_STRIPE_LINKS || {};
    const live = Object.entries(links).filter(([, v]) => v);
    stripeBox.innerHTML = live.length
      ? "<p><strong>Pay now (Stripe):</strong></p>" + live.map(([k, v]) => `<p><a href="${v}">Pay for ${k}</a></p>`).join("")
      : "<p style='color:var(--muted);font-size:.85rem'>Card payment via Stripe activates after you paste Payment Links in js/cart.js.</p>";
  }
  render();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!items().length) { window.advigrowToast?.("Cart is empty."); return; }
    if (!document.getElementById("co-ruo").checked) { window.advigrowToast?.("RUO confirmation required."); return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    data.order = items();
    data.total = window.AdvigrowCart.total();
    data.ruo_confirmed = true;
    try {
      if (FORMSPREE_ENDPOINT) {
        const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error("formspree failed");
        window.advigrowToast?.("Quote submitted. Check email for confirmation.");
      } else {
        const subject = encodeURIComponent(`Quote request $${data.total} — ${data.org}`);
        const body = encodeURIComponent(JSON.stringify(data, null, 2));
        window.location.href = `mailto:${ORDERS_EMAIL}?subject=${subject}&body=${body}`;
        window.advigrowToast?.("Opening email to advigrow@gmail.com — send to submit.");
      }
      try { window.AdvigrowAnalytics?.("quote_request", { value: data.total }); } catch {}
      window.AdvigrowCart.clear(); form.reset(); render();
    } catch {
      window.advigrowToast?.("Submit failed. Email advigrow@gmail.com directly.");
    }
  });
})();
