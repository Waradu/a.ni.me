import VueTippy, { setDefaultProps } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy);
  setDefaultProps({
    interactive: false,
    animation: "shift-away",
    theme: "custom",
    maxWidth: 250,
    arrow: false,
    hideOnClick: false,
    appendTo: () => document.body,
  });
});
