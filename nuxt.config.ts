import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  devServer: {
    host: process.env.TAURI_DEV_HOST || "127.0.0.1",
  },

  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
    },
    plugins: [
      tailwindcss(),
    ]
  },

  ignore: ['**/src-tauri/**'],

  modules: [
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "motion-v/nuxt",
    "@waradu/keyboard/nuxt",
    "nuxt-svgo",
    "@nuxt/eslint",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt"
  ],

  css: ["~/assets/css/tailwind.css", "~/assets/css/tippy.css"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        style: "background: #262626;"
      }
    }
  },

  fonts: {
    provider: "bunny",
    families: [
      {
        name: "Inter",
        provider: "bunny",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    ]
  },

  nitro: {
    preset: "bun"
  },

  svgo: {
    autoImportPath: false,
    defaultImport: "component",
    dts: true,
  },

  runtimeConfig: {
    public: {
      redirectUri: process.env.REDIRECT_URI,
    }
  },

  image: {
    domains: [
      "s4.anilist.co"
    ]
  }
});