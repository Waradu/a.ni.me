import type { ToastStore, Toast as T, ToastTypes } from "~/types/toast";

export const useToaster = defineStore("toaster", {
  state: (): ToastStore => ({
    message: "",
    visible: false,
  }),
  actions: {
    set(message: string) {
      this.visible = true;
      this.message = message;
    },
  },
});
