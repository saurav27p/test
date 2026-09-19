(() => {
  const scriptUrl = document.currentScript?.src;
  const componentBase = scriptUrl
    ? new URL("../", scriptUrl)
    : new URL("./", document.baseURI);

  const loadComponents = async () => {
    const componentTargets = Array.from(
      document.querySelectorAll("[data-component]")
    );

    await Promise.all(
      componentTargets.map(async (element) => {
        const componentPath = element.getAttribute("data-component");

        if (!componentPath) {
          return;
        }

        const componentUrl = new URL(
          componentPath,
          componentBase
        );

        const response = await fetch(componentUrl.href);

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${componentUrl.pathname}`
          );
        }

        element.outerHTML = await response.text();
      })
    );

    document.dispatchEvent(
      new Event("pragyaroot:components-loaded")
    );
  };

  const initialize = () => {
    loadComponents().catch((error) => {
      console.error("PragyaRoot component error:", error);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
