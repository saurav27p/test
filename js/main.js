

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  /* Theme */
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const savedTheme = localStorage.getItem("pragyaroot-theme");

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  } else {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-theme", systemDark ? "dark" : "light");
  }

  themeToggle?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("pragyaroot-theme", nextTheme);
  });

  /* Mobile Menu */
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuOverlay = document.querySelector("[data-menu-overlay]");

  const openMenu = () => {
    mobileMenu?.classList.add("is-open");
    menuOverlay?.classList.add("is-visible");
    menuButton?.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    mobileMenu?.classList.remove("is-open");
    menuOverlay?.classList.remove("is-visible");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay?.addEventListener("click", closeMenu);

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* Desktop Layout */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});
