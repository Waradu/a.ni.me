export default defineNuxtRouteMiddleware((to, from) => {
  const order = ["/", "/search", "/settings"]
  const toTransition = to.meta.pageTransition
  const fromTransition = from.meta.pageTransition

  if (
    toTransition && fromTransition &&
    typeof toTransition !== 'boolean' &&
    typeof fromTransition !== 'boolean'
  ) {
    const toIndex = order.indexOf(to.path)
    const fromIndex = order.indexOf(from.path)

    if (toIndex === -1 || fromIndex === -1) return

    const direction = toIndex > fromIndex ? 'right' : 'left'
    const transitionName = `slide-${direction}`

    toTransition.name = transitionName
    fromTransition.name = transitionName
  }
})
