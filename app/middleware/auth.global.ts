export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.token && to.fullPath != "/welcome") {
    return navigateTo("/welcome");
  }
});
