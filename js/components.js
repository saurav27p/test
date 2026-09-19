document.addEventListener("DOMContentLoaded", async () => {
  const componentTargets = document.querySelectorAll(
    "[data-component]"
  );

  if (!componentTargets.length) {
    return;
  }

  const loadComponent = async (element) => {
    const componentPath = element.dataset.component;

    if (!componentPath) {
      return;
    }

    try {
      const response = await fetch(componentPath);

      if (!response.ok) {
        throw new Error(
          `Failed to load component: ${response.status}`
        );
      }

      const html = await response.text();

      element.innerHTML = html;
    } catch (error) {
      console.error(
        "PragyaRoot component loading error:",
        error
      );
    }
  };

  await Promise.all(
    [...componentTargets].map(loadComponent)
  );

  document.dispatchEvent(
    new CustomEvent("pragyaroot:components-loaded")
  );
});
