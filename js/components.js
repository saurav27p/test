

document.addEventListener("DOMContentLoaded", () => {
  const componentTargets = document.querySelectorAll(
    "[data-component]"
  );

  const loadComponent = (element) => {
    const componentPath = element.getAttribute(
      "data-component"
    );

    if (!componentPath) {
      return Promise.resolve();
    }

    return fetch(componentPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${componentPath}`
          );
        }

        return response.text();
      })
      .then((content) => {
        element.outerHTML = content;
      })
      .catch((error) => {
        console.error(
          "PragyaRoot component error:",
          error
        );

        element.remove();
      });
  };

  Promise.all(
    Array.from(componentTargets).map(loadComponent)
  ).then(() => {
    document.dispatchEvent(
      new Event("pragyaroot:components-loaded")
    );
  });
});
