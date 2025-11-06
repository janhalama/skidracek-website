/* Renders floating webcam CTA button if webcamUrl present in hero content */

import { fetchContentBlock } from '@/lib/content-service';

export default async function FloatingWebcam() {
  const block = await fetchContentBlock('hero');
  const data = (block?.data as { webcamUrl?: string } | null) || null;
  const url = data?.webcamUrl;
  if (!url) return null;
  // Deprecated floating button kept for compatibility; now rendered inside Hero and mobile menu.
  return null;
}
