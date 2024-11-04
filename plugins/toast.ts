import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    clearOnUrlChange: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false,
    hideProgressBar: true,
    style: {},
    theme: "dark",
  });

  return {
    provide: { toast },
  };
});
