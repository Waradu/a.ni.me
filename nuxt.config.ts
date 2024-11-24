// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "nuxt-svgo",
    "@pinia/nuxt",
    "wrdu-keyboard",
    "pinia-plugin-persistedstate/nuxt",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  svgo: {
    autoImportPath: false,
  },
});
