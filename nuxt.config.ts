// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  devServer: { host: process.env.TAURI_DEV_HOST || "localhost" },

  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-lucide-icons",
    "@pinia/nuxt",
    "nuxt-svgo",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    editorSupport: true,
  },

  lucide: {
    namePrefix: "Icon",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        style: "background: #262626;"
      },
    },
  },

  runtimeConfig: {
    public: {
      redirectUri: process.env.REDIRECT_URI,
    }
  },

  svgo: {
    autoImportPath: false,
    defaultImport: "component",
    dts: true,
  },

  image: {
    domains: [
      "s4.anilist.co"
    ]
  }
});