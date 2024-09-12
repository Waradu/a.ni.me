// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-svgo", "@pinia/nuxt"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
