import type { ToastStore } from "~/types/toast";

export const useToaster = defineStore("toaster", {
  state: (): ToastStore => ({
    message: "",
    visible: false,
    click: async (e) => true,
    color: "normal",
  }),
  actions: {
    set(message: string, color: ToastStore["color"] = "normal") {
      this.visible = true;
      this.message = message;
      this.color = color;
    },
  },
});
