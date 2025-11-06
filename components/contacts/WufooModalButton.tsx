"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";

/*
  WufooModalButton shows a button that opens the Wufoo form in a modal.
  It lazy-loads the Wufoo embed script only when opened.
*/
export default function WufooModalButton({ url, label = "Napište nám (formulář)" }: { url: string; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerId = useMemo(function computeContainerId() {
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/").filter(Boolean);
      const formHash = parts[1] || "form"; // e.g., /forms/<hash>/
      return `wufoo-${formHash}`;
    } catch {
      return "wufoo-form";
    }
  }, [url]);

  const embedOptions = useMemo(function computeOptions() {
    try {
      const parsed = new URL(url);
      const hostParts = parsed.hostname.split(".");
      const userName = hostParts[0];
      const parts = parsed.pathname.split("/").filter(Boolean);
      const formHash = parts[1];
      return { userName, formHash } as { userName: string; formHash: string };
    } catch {
      return { userName: "", formHash: "" } as { userName: string; formHash: string };
    }
  }, [url]);

  const scriptLoadedRef = useRef(false);

  useEffect(function loadWufooOnOpen() {
    if (!isOpen) return;
    if (!embedOptions.userName || !embedOptions.formHash) return;

    if (scriptLoadedRef.current && (window as any)[embedOptions.formHash]) {
      // Display again if already initialized
      try {
        (window as any)[embedOptions.formHash].display();
      } catch {}
      return;
    }

    const s = document.createElement("script");
    const protocol = window.location.protocol === "https:" ? "https://" : "http://";
    s.src = protocol + "wufoo.com/scripts/embed/form.js";
    s.async = true;

    s.onload = function onLoad() {
      try {
        const WufooForm = (window as any).WufooForm;
        if (!WufooForm) return;
        const options = {
          userName: embedOptions.userName,
          formHash: embedOptions.formHash,
          autoResize: true,
          height: "600",
          async: true,
          host: "wufoo.com",
          header: "show",
          ssl: true,
        } as const;
        const instance = new WufooForm();
        instance.initialize(options);
        instance.display();
        (window as any)[embedOptions.formHash] = instance;
        scriptLoadedRef.current = true;
      } catch {}
    };

    document.body.appendChild(s);
    return function cleanup() {
      // keep script for subsequent opens; no removal
    };
  }, [isOpen, embedOptions]);

  // Keep loader visible until the embedded iframe reports load
  useEffect(function watchIframeLoad() {
    if (!isOpen) return;
    const root = containerRef.current;
    if (!root) return;

    function tryAttach(el: HTMLElement): boolean {
      const iframe = el.querySelector<HTMLIFrameElement>("iframe");
      if (!iframe) return false;
      let handled = false;
      const onLoad = () => {
        handled = true;
        setIsLoading(false);
      };
      // If it loads after we attach, we'll catch it
      iframe.addEventListener("load", onLoad, { once: true });
      // Fallback: if already loaded and load won't fire again
      setTimeout(() => { if (!handled) setIsLoading(false); }, 2000);
      return true;
    }

    const observer = new MutationObserver(() => {
      if (tryAttach(root)) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
    // Also attempt immediately in case iframe already present
    tryAttach(root);
    return () => observer.disconnect();
  }, [isOpen, containerId]);

  const onClose = useCallback(function handleClose() {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-sm border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface"
        onClick={() => { setIsOpen(true); setIsLoading(true); }}
      >
        <svg aria-hidden="true" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.94 6.34A2 2 0 014.33 6h11.34a2 2 0 011.39.34l-7.06 5.3a1 1 0 01-1.2 0L2.94 6.34z" />
          <path d="M18 8.12V14a2 2 0 01-2 2H4a2 2 0 01-2-2V8.12l6.47 4.86a3 3 0 003.06 0L18 8.12z" />
        </svg>
        {label}
      </button>

      <Modal isOpen={isOpen} onClose={onClose} title="Kontaktujte nás">
        <div className="relative p-4">
          <div className="relative min-h-[600px]">
            {isLoading ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="inline-flex items-center rounded-sm bg-white/90 px-3 py-1.5 text-sm text-primary">
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" className="opacity-20" />
                    <path d="M12 2a10 10 0 00-9 5.5" className="opacity-80" />
                  </svg>
                  Načítám formulář…
                </div>
              </div>
            ) : null}
            <div id={containerId} ref={containerRef} />
          </div>
        </div>
      </Modal>
    </>
  );
}
