type ToastType = 'success' | 'info' | 'warning' | 'level_up';
interface ToastEvent {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastEvent) => void;
let listeners: Listener[] = [];
let nextId = 0;

export const showSystemToast = (message: string, type: ToastType = 'info') => {
  const toast = { id: nextId++, message, type };
  listeners.forEach(l => l(toast));
};

export const subscribeToasts = (listener: Listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
