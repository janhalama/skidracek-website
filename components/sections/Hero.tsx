/*
  Hero section renders content server-side from Supabase.
  Will be extended with webcam link, weather, notice banner, and CTA.
*/

import { fetchContentBlock } from '@/lib/content-service';

type HeroData = {
  tagline: string;
  webcamUrl?: string;
  noticeBanner?: { isVisible: boolean; text: string };
};

export default async function Hero() {
  const block = await fetchContentBlock('hero');
  const data = (block?.data as HeroData) || null;
  return (
    <section id="hero" className="container-base py-12 sm:py-16">
      {data?.noticeBanner?.isVisible && data?.noticeBanner?.text ? (
        <div className="mb-4 rounded-md border border-border bg-surface p-3">{data.noticeBanner.text}</div>
      ) : null}
      <h1 className="text-3xl sm:text-4xl font-semibold">SkiDráček</h1>
      <p className="mt-2 text-[color:var(--color-text-muted)]">{data?.tagline ?? 'Místní vlek a školička v Alšovicích.'}</p>
      {data?.webcamUrl ? (
        <p className="mt-3">
          <a href={data.webcamUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Webkamera
          </a>
        </p>
      ) : null}
    </section>
  );
}


