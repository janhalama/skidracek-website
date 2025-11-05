/* Renders floating webcam CTA button if webcamUrl present in hero content */

import { fetchContentBlock } from '@/lib/content-service';

export default async function FloatingWebcam() {
  const block = await fetchContentBlock('hero');
  const data = (block?.data as { webcamUrl?: string } | null) || null;
  const url = data?.webcamUrl;
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-40 top-[59px] sm:right-40 z-90 inline-flex items-center rounded-sm bg-white text-primary border border-primary px-3 py-2 text-sm font-medium shadow-md hover:bg-danger hover:text-primary-foreground hover:shadow-lg"
    >
      <svg aria-hidden className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 7a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3V7z" />
        <path d="M17 9l4-2v8l-4-2V9z" />
      </svg>
      Webkamera online
    </a>
  );
}
