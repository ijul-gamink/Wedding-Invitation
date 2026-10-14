import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastNotification } from '../../types';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-fade-in ${
              isSuccess
                ? 'bg-ivory-50/95 text-espresso-800 border-emerald-500/30'
                : isError
                ? 'bg-rose-50/95 text-rose-900 border-rose-300'
                : 'bg-ivory-50/95 text-espresso-800 border-gold-300/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-gold-600 flex-shrink-0" />}
              <p className="text-xs sm:text-sm font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-full text-espresso-400 hover:text-espresso-700 hover:bg-espresso-100/50 transition-colors ml-2"
              aria-label="Tutup pemberitahuan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
