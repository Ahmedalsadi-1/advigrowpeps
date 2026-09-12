/* ADVIGROW auth — Clerk on a static site. Owner setup: docs/SETUP-AUTH.md */
(() => {
  "use strict";
  const CLERK_PUBLISHABLE_KEY = "pk_test_REPLACE_ME";
  if (!CLERK_PUBLISHABLE_KEY || CLERK_PUBLISHABLE_KEY.indexOf("REPLACE_ME") !== -1) return;

  const script = document.createElement("script");
  script.src = "https://unpkg.com/@clerk/clerk-js@5/dist/clerk.browser.js";
  script.crossOrigin = "anonymous";
  script.onload = async () => {
    try {
      await window.Clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });
      const slot = document.getElementById("nav-auth");
      if (!slot) return;
      if (window.Clerk.user) {
        const host = document.getElementById("clerk-user-slot");
        if (host) {
          window.Clerk.mountUserButton(host);
          slot.hidden = false;
        }
      } else {
        const host = document.getElementById("clerk-signin-slot");
        if (host) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "clerk-btn";
          btn.textContent = "Sign in";
          btn.addEventListener("click", () => window.Clerk.openSignIn());
          host.appendChild(btn);
          slot.hidden = false;
        }
      }
    } catch {
      /* Auth unavailable — site works without it. */
    }
  };
  document.head.appendChild(script);
})();
