export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.token && to.fullPath != "/welcome") {
    return navigateTo("/welcome");
  }
});
