import { defineNuxtPlugin } from "#app";
import VueTippy, { setDefaultProps } from "vue-tippy";
import "tippy.js/dist/tippy.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy);
  setDefaultProps({
    content: (reference) => reference.getAttribute("title") ?? "",
    interactive: false,
    animation: "shift-away",
    theme: "custom",
    maxWidth: 250,
    arrow: false,
  });
});
