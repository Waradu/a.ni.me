export default defineNuxtRouteMiddleware((to, from) => {
  const { auth } = useAuth();

  if (!auth.value?.token && to.fullPath != "/welcome") {
    return navigateTo("/welcome");
  }
});
