import type { ToastStore } from "~/types/toast";

export const useToaster = defineStore("toaster", {
  state: (): ToastStore => ({
    message: "",
    visible: false,
    click: async (e) => true,
  }),
  actions: {
    set(message: string) {
      this.visible = true;
      this.message = message;
    },
  },
});
