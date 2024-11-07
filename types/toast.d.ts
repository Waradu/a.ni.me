export type ToastTypes = "normal" | "error";

export interface Toast {
  id: number;
  content: string;
  type: ToastTypes;
  health: number | "dead";

  close: () => void;
  update: () => void;
  show: () => void;
  hide: () => void;
  kill: () => void;

  onClick: (e: MouseEvent) => void;
  onUpdate: () => void;
  onShow: () => void;
  onActive: () => void;
  onHide: () => void;
  onInactive: () => void;
}

export interface ToastStore {
  message: string;
  visible: boolean;
  click: (e: MouseEvent) => Promise<boolean>;
}
