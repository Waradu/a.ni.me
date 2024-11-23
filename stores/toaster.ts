type toasterColor = "normal" | "red" | "green";

export interface ToastStore {
  message: string;
  visible: boolean;
  click: (e: MouseEvent) => Promise<boolean>;
  color: toasterColor;
}

export const useToaster = defineStore("toaster", {
  state: (): ToastStore => ({
    message: "",
    visible: false,
    click: async (e) => true,
    color: "normal",
  }),
  actions: {
    set(message: string, color: toasterColor = "normal") {
      this.visible = true;
      this.message = message;
      this.color = color;
    },
  },
});
