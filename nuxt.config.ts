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

  modules: ["@nuxtjs/tailwindcss", "nuxt-lucide-icons"],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    editorSupport: true,
  },

  lucide: {
    namePrefix: "Icon",
  },
});
