

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
          `Component request failed: ${response.status}`
        );
      }

      element.innerHTML = await response.text();

    } catch (error) {
      console.error(error);
    }
  };

  await Promise.all(
    [...componentTargets].map(loadComponent)
  );

  document.dispatchEvent(
    new CustomEvent("pragyaroot:components-loaded")
  );
});
