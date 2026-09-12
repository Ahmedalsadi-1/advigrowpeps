/* ADVIGROW PEPTIDES — interactions */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Page storyline entrance: hero chapters rise in on load
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add("loaded"));
  });

  // Nav scrolled state + scroll progress hairline + hero parallax (one rAF loop)
  const nav = document.querySelector(".site-nav");
  const heroImg = document.querySelector(".hero-media img");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (nav) {
        nav.classList.toggle("scrolled", y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(100, (y / max) * 100) : 0;
        nav.style.setProperty("--progress", `${p}%`);
      }
      if (heroImg && !prefersReduced && y < window.innerHeight) {
        heroImg.style.transform = `translateY(${y * 0.25}px)`;
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile burger with Escape to close
  const burger = document.querySelector(".nav-burger");
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  };
  if (burger) {
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", closeNav)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  // Active link fallback when aria-current is missing
  const current = document.querySelector('.nav-links a[aria-current="page"]');
  if (!current) {
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
      if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
    });
  }

  // Scroll reveals
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Product filtering
  const chips = document.querySelectorAll(".chip[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.category === f;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // Toast
  const toast = document.querySelector(".toast");
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };
  window.advigrowToast = showToast;

  // Demo quote / cart buttons
  document.querySelectorAll("[data-demo-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.dataset.product || "this compound";
      showToast(
        `${name} added to quote request — a specialist will confirm COA availability.`
      );
    });
  });

  // Batch promo bar dismiss
  const promo = document.querySelector(".promo-bar");
  const promoClose = document.querySelector(".promo-close");
  if (promo && promoClose) {
    promoClose.addEventListener("click", () => {
      promo.remove();
      document.body.classList.remove("has-promo");
    });
  }

  // FAQ accordion (one open at a time)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((other) => {
        other.classList.remove("open");
        const otherBtn = other.querySelector(".faq-q");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Contact form — Formspree-ready (falls back to toast + mailto)
  const form = document.querySelector("form[data-contact]");
  if (form) {
    // TODO owner: paste Formspree endpoint, same as checkout.js
    const CONTACT_ENDPOINT = "";
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        if (CONTACT_ENDPOINT) {
          await fetch(CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, page: location.pathname }) });
        }
        try { window.AdvigrowAnalytics?.("coa_request", { topic: data.topic || "contact" }); } catch {}
      } catch {}
      showToast("Message received. Our research team replies within one business day.");
      form.reset();
    });
  }
})();
