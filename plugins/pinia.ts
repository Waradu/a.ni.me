import { defineNuxtPlugin } from '#app'
import piniaPersist from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const pinia = nuxtApp.$pinia;
    pinia.use(piniaPersist);
  }
});