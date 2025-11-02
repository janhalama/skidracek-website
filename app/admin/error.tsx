/**
 * Admin route error boundary.
 */

'use client';

export default function AdminError({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold mb-2">Chyba administrace</h2>
      <p className="text-sm text-gray-700">{error.message}</p>
    </div>
  );
}




