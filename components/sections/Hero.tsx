/*
  Hero section renders content server-side from Supabase.
  Will be extended with webcam link, weather, notice banner, and CTA.
*/

import { fetchContentBlock } from '@/lib/content-service';
import { fetchNormalizedWeather } from '@/lib/weather';

type HeroData = {
  tagline: string;
  webcamUrl?: string;
  noticeBanner?: { isVisible: boolean; text: string };
  cta?: { label: string; url: string };
};

export default async function Hero() {
  const [block, weather] = await Promise.all([
    fetchContentBlock('hero'),
    fetchNormalizedWeather({ revalidateSeconds: 3600 }),
  ]);
  const data = (block?.data as HeroData) || null;
  return (
    <section id="hero" className="container-base py-12 sm:py-16">
      {data?.noticeBanner?.isVisible && data?.noticeBanner?.text ? (
        <div className="mb-4 rounded-md border border-border bg-surface p-3">{data.noticeBanner.text}</div>
      ) : null}
      <h1 className="text-3xl sm:text-4xl font-semibold">SkiDráček</h1>
      <p className="mt-2 text-[color:var(--color-text-muted)]">{data?.tagline ?? 'Místní vlek a školička v Alšovicích.'}</p>
      {weather && (weather.temperatureC !== null || weather.snowDepthCm !== null) ? (
        <div className="mt-3 text-sm text-[color:var(--color-text-muted)]">
          {weather.temperatureC !== null ? <span>Aktuálně: {Math.round(weather.temperatureC)}°C</span> : null}
          {weather.temperatureC !== null && weather.snowDepthCm !== null ? <span> · </span> : null}
          {weather.snowDepthCm !== null ? <span>Sníh: {Math.round(weather.snowDepthCm)} cm</span> : null}
        </div>
      ) : null}
      {data?.webcamUrl ? (
        <p className="mt-3">
          <a href={data.webcamUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Webkamera
          </a>
        </p>
      ) : null}
      {data?.cta ? (
        <p className="mt-3">
          <a href={data.cta.url} target="_blank" rel="noopener noreferrer" className="underline">
            {data.cta.label}
          </a>
        </p>
      ) : null}
    </section>
  );
}


