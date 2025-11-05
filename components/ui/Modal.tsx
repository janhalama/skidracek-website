"use client";

import { useEffect } from "react";

/*
  Modal renders children inside a centered overlay dialog.
  Closes on ESC, backdrop click, or close button.
*/
export function Modal({ isOpen, onClose, children, title }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string }) {
  useEffect(function setupEscToClose() {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={title || "Dialog"} className="relative z-[101] w-[92vw] max-w-[720px] rounded-sm bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="text-sm font-medium text-primary">{title}</div>
          <button
            type="button"
            aria-label="Zavřít"
            className="inline-flex items-center rounded-sm border border-transparent px-2 py-1 text-sm text-primary hover:bg-surface"
            onClick={onClose}
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}
