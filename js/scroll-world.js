/* ADVIGROW PEPTIDES — Scroll World engine (CSS-transform variant)
   Scroll scrubs a pinned 6-scene fly-through. Scenes crossfade while
   their media layers scale/translate at scene-specific rates to fake
   continuous camera travel: incoming scene zooms DOWN from far, outgoing
   zooms UP and past — the "dive in, pull out, fly to next" grammar. */
(() => {
  "use strict";

  const stage = document.getElementById("world");
  if (!stage) return;

  const scenes = Array.from(stage.querySelectorAll(".scene"));
  const rail = document.getElementById("rail");
  const progress = document.querySelector(".scroll-progress");
  const hint = document.querySelector(".scroll-hint");
  const space = document.querySelector(".world-scroll-space");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll distance per scene, in viewport-heights (hero scenes linger longer)
  const SCENE_VHS = [1.5, 1.2, 1.2, 1.2, 1.2, 1.7];
  const totalVH = SCENE_VHS.reduce((a, b) => a + b, 0);

  // Boundaries in absolute scroll px, computed on resize
  let bounds = []; // [{start, end}] per scene
  function layout() {
    const vh = window.innerHeight;
    let acc = 0;
    bounds = SCENE_VHS.map((v) => {
      const b = { start: acc, end: acc + v * vh };
      acc += v * vh;
      return b;
    });
    space.style.height = `${acc + window.innerHeight}px`;
  }
  layout();
  window.addEventListener("resize", () => {
    layout();
    update(true);
  });

  // Parallax rates: how much the media layer drifts while a scene owns the viewport
  const DRIFT = [0.12, 0.10, 0.10, 0.10, 0.10, 0.14];

  let activeIdx = -1;
  function update(force) {
    const y = window.scrollY;
    const vh = window.innerHeight;

    // progress bar
    if (progress) {
      const p = Math.min(1, y / (bounds[bounds.length - 1].end - vh + vh * 0.2));
      progress.style.transform = `scaleX(${p})`;
    }
    if (hint) hint.classList.toggle("hidden", y > vh * 0.35);

    // find owning scene
    let idx = 0;
    for (let i = 0; i < bounds.length; i++) {
      if (y >= bounds[i].start - vh * 0.5) idx = i;
    }
    const b = bounds[idx];
    const local = Math.min(1, Math.max(0, (y - b.start) / (b.end - b.start)));

    // switch active scene
    if (idx !== activeIdx || force) {
      activeIdx = idx;
      scenes.forEach((s, i) => {
        s.classList.toggle("active", i === idx);
        s.style.visibility = Math.abs(i - idx) <= 1 ? "visible" : "hidden";
      });
      rail.querySelectorAll(".rail-dot").forEach((d, i) =>
        d.classList.toggle("current", i === idx)
      );
    }

    if (reduced) return;

    // fly-through transforms:
    // current scene: media eases from 1.18 → 1.0 scale while drifting
    const media = scenes[idx].querySelector(".scene-media");
    if (media) {
      const scale = 1.18 - 0.18 * local;
      const ty = local * DRIFT[idx] * vh * 0.5;
      media.style.transform = `scale(${scale}) translateY(${ty}px)`;
    }
    // copy: rises and settles
    const copy = scenes[idx].querySelector(".scene-copy");
    if (copy) {
      const rise = (1 - local) * 40;
      copy.style.transform = `translateY(${rise}px)`;
      copy.style.opacity = String(0.35 + 0.65 * Math.min(1, local * 2.2));
    }
    // next scene peeks: scale down from 1.3 as we approach its boundary
    const next = scenes[idx + 1];
    if (next) {
      const approach = Math.max(0, local - 0.72) / 0.28; // 0→1 near boundary
      const nm = next.querySelector(".scene-media");
      if (nm) {
        nm.style.transform = `scale(${1.3 - 0.3 * approach})`;
        next.style.opacity = String(approach * 0.9);
      }
    }
  }

  // Rail dots
  const LABELS = scenes.map((s) => s.dataset.label || "");
  scenes.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "rail-dot";
    d.setAttribute("aria-label", `Go to scene ${i + 1}: ${LABELS[i]}`);
    d.innerHTML = `<span class="dot-label">${LABELS[i]}</span>`;
    d.addEventListener("click", () => {
      window.scrollTo({ top: bounds[i].start + 4, behavior: "smooth" });
    });
    rail.appendChild(d);
  });

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Deep-link support: ?scene=N or ?scene=label jumps to that scene
  const params = new URLSearchParams(window.location.search);
  const sceneParam = params.get("scene");
  if (sceneParam !== null) {
    let target = -1;
    const n = Number.parseInt(sceneParam, 10);
    if (!Number.isNaN(n) && n >= 0 && n < bounds.length) target = n;
    else {
      const li = scenes.findIndex(
        (s) => (s.dataset.label || "").toLowerCase() === sceneParam.toLowerCase()
      );
      if (li >= 0) target = li;
    }
    if (target >= 0) {
      window.scrollTo(0, bounds[target].start + bounds[target].end - bounds[target].start - window.innerHeight * 0.35);
    }
  }

  update(true);
})();
