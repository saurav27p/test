(() => {
  const componentBase = new URL(
    "./components/",
    document.baseURI
  );

  const loadComponent = async (element) => {
    const componentPath = element.getAttribute(
      "data-component"
    );

    if (!componentPath) {
      return;
    }

    const componentName = componentPath.split("/").pop();
    const componentUrl = new URL(
      componentName,
      componentBase
    );

    try {
      console.log(
        "PragyaRoot component URL:",
        componentUrl.href
      );

      const response = await fetch(componentUrl.href);

      console.log(
        "PragyaRoot component response:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${componentUrl.href}`
        );
      }

      const content = await response.text();

      if (!content.trim()) {
        throw new Error(
          `Empty component response: ${componentUrl.href}`
        );
      }

      element.outerHTML = content;
    } catch (error) {
      console.error(
        "PragyaRoot component error:",
        error
      );
    }
  };

  const initialize = async () => {
    const componentTargets = Array.from(
      document.querySelectorAll("[data-component]")
    );

    await Promise.all(
      componentTargets.map(loadComponent)
    );

    document.dispatchEvent(
      new Event("pragyaroot:components-loaded")
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
