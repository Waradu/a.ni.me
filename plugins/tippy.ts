import { defineNuxtPlugin } from "#app";
import VueTippy, { setDefaultProps } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import 'tippy.js/dist/svg-arrow.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy);
  setDefaultProps({
    content: (reference) => reference.getAttribute("title") ?? "",
    interactive: true,
    maxWidth: 300,
  });
});
