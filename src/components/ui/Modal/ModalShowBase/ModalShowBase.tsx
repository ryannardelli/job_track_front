import { AnimationPresenceMotion } from "@components/ui/Motion/AnimationPresenceMotion";
import { MotionContainer } from "@components/ui/Motion/MotionContainer";
import React, { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalShowBaseProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
  children: ReactNode;
}

export const ModalShowBase: React.FC<ModalShowBaseProps> = ({
  isOpen,
  title,
  onClose,
  onEdit,
  onDelete,
  isLoading = false,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimationPresenceMotion>
      <MotionContainer
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MotionContainer
          className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
        >
          <header className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                {title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Detalhes da candidatura
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-col-reverse sm:flex-row justify-between gap-3">
            <div>
              {onDelete && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onDelete}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-50 cursor-pointer"
                >
                  Excluir candidatura
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Fechar
              </button>

              {onEdit && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onEdit}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                >
                  Editar
                </button>
              )}
            </div>
          </footer>
        </MotionContainer>
      </MotionContainer>
    </AnimationPresenceMotion>,
    document.body
  );
};