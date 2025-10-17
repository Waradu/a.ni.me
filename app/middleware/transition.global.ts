export default defineNuxtRouteMiddleware((to, from) => {
  const order = ["/", "/explore", "/settings"];
  const toTransition = to.meta.pageTransition;
  const fromTransition = from.meta.pageTransition;

  if (
    toTransition &&
    fromTransition &&
    typeof toTransition !== "boolean" &&
    typeof fromTransition !== "boolean"
  ) {
    const toIndex = order.indexOf(to.path);
    const fromIndex = order.indexOf(from.path);

    let transitionName = "page";

    if (toIndex !== -1 && fromIndex !== -1 && toIndex !== fromIndex) {
      const direction = toIndex > fromIndex ? "right" : "left";
      transitionName = `slide-${direction}`;
    }

    toTransition.name = transitionName;
    fromTransition.name = transitionName;
  }
});
