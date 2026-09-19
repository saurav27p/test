(() => {
  let initialized = false;

  const initializePragyaRoot = () => {
    if (initialized) {
      return;
    }

    const siteHeader = document.querySelector(
      ".site-header, .mobile-header"
    );

    if (!siteHeader) {
      return;
    }

    initialized = true;

    const html = document.documentElement;

    /* Theme */
    const themeToggles = document.querySelectorAll(
      "[data-theme-toggle]"
    );

    const savedTheme = localStorage.getItem(
      "pragyaroot-theme"
    );

    if (savedTheme === "dark" || savedTheme === "light") {
      html.setAttribute("data-theme", savedTheme);
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      html.setAttribute(
        "data-theme",
        systemDark ? "dark" : "light"
      );
    }

    const updateThemeControls = () => {
      const currentTheme =
        html.getAttribute("data-theme");

      const isDark = currentTheme === "dark";

      themeToggles.forEach((toggle) => {
        toggle.setAttribute(
          "aria-pressed",
          String(isDark)
        );

        toggle.setAttribute(
          "aria-label",
          isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
        );
      });
    };

    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const currentTheme =
          html.getAttribute("data-theme");

        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";

        html.setAttribute(
          "data-theme",
          nextTheme
        );

        localStorage.setItem(
          "pragyaroot-theme",
          nextTheme
        );

        updateThemeControls();
      });
    });

    updateThemeControls();

    /* Navigation */
    const menuButton = document.querySelector(
      "[data-menu-toggle]"
    );

    const mobileMenu = document.querySelector(
      "[data-mobile-menu]"
    );

    const menuOverlay = document.querySelector(
      "[data-menu-overlay]"
    );

    const openMenu = () => {
      if (!mobileMenu) {
        return;
      }

      mobileMenu.classList.add("is-open");
      menuOverlay?.classList.add("is-visible");

      menuButton?.setAttribute(
        "aria-expanded",
        "true"
      );

      mobileMenu.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      if (!mobileMenu) {
        return;
      }

      mobileMenu.classList.remove("is-open");
      menuOverlay?.classList.remove("is-visible");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

      mobileMenu.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove("menu-open");
    };

    menuButton?.addEventListener("click", () => {
      const isOpen =
        mobileMenu?.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuOverlay?.addEventListener(
      "click",
      closeMenu
    );

    mobileMenu?.querySelectorAll("a").forEach(
      (link) => {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }
    );

    const desktopMediaQuery =
      window.matchMedia("(min-width: 768px)");

    desktopMediaQuery.addEventListener(
      "change",
      (event) => {
        if (event.matches) {
          closeMenu();
        }
      }
    );
  };

  document.addEventListener(
    "pragyaroot:components-loaded",
    initializePragyaRoot,
    { once: true }
  );

  if (
    document.querySelector(
      ".site-header, .mobile-header"
    )
  ) {
    initializePragyaRoot();
  }
})();
