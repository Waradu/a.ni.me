// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: ["nuxt-svgo", "@pinia/nuxt", "wrdu-keyboard", "@nuxt/scripts"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/basic.scss";`,
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  svgo: {
    autoImportPath: false
  }
});
