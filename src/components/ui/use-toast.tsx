import { error } from 'console';
import { useEffect, useState } from 'react';
import * as React from 'react';

export type ToastVariant = 'default' | 'destructive';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastActionElement {
  altText: string;
}

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 150;

type ToasterToast = Toast & {
  visible: boolean;
  height?: number;
  onRemove: () => void;
};

const toasts: ToasterToast[] = [];

let listeners: ((state: ToasterToast[]) => void)[] = [];

function createToast(toast: Toast) {
  const id = toast.id || String(Date.now());

  const newToast = {
    ...toast,
    id,
    visible: true,
    onRemove: () => removeToast(id),
  };

  toasts.push(newToast);

  listeners.forEach((listener) => {
    listener([...toasts]);
  });

  return newToast;
}

function removeToast(id: string) {
  const toast = toasts.find((t) => t.id === id);

  if (toast) {
    toast.visible = false;

    setTimeout(() => {
      toasts.splice(toasts.indexOf(toast), 1);
      listeners.forEach((listener) => {
        listener([...toasts]);
      });
    }, TOAST_REMOVE_DELAY);
  }
}

export function useToast(p0?: {
  variant: string;
  title?: string | undefined;
  description?: string | undefined;
  action?: React.ReactNode;
  duration?: number | undefined;
}) {
  const [state, setState] = useState<ToasterToast[]>([]);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toast: (props: Toast) => {
      const toast = createToast(props);

      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 5000);

      return toast;
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        removeToast(toastId);
      } else {
        toasts.forEach((toast) => {
          removeToast(toast.id);
        });
      }
    },
    toasts: state,
  };
}

// Toast UI Component
export function Toast({ toast }: { toast: ToasterToast }) {
  return (
    <div
      className={`group pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full ${
        toast.variant === 'destructive'
          ? 'bg-red-600 text-white'
          : 'bg-white text-gray-950 dark:bg-gray-800 dark:text-gray-50'
      }`}
    >
      <div className="flex">
        <div className="flex-1">
          {toast.title && (
            <div className="text-sm font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
        </div>
        {toast.action}
        <button
          onClick={toast.onRemove}
          className="ml-4 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

// Helper function for easier use
export const toast = {
  success: (props: Omit<Toast, 'id' | 'variant'>) => {
    const { toast: toastFn } = useToast();
    return toastFn({
      ...props,
      variant: 'default',
      id: '',
    });
  },
  error: (props: Omit<Toast, 'id' | 'variant'>) => {
    const { toast: toastFn } = useToast();
    return useToast({ ...props, variant: 'destructive' });
  },
};
