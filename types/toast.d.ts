export interface ToastStore {
  message: string;
  visible: boolean;
  click: (e: MouseEvent) => Promise<boolean>;
  color: "normal" | "red" | "green";
}
