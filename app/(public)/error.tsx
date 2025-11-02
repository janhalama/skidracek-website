"use client";

/* Minimal route-level error boundary */

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-base py-12">
      <h2 className="text-2xl font-semibold">Něco se pokazilo</h2>
      <p className="mt-2 text-[color:var(--color-text-muted)]">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Zkusit znovu
      </button>
    </div>
  );
}


