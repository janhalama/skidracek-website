/*
  Hero section renders content server-side from Supabase.
  Will be extended with webcam link, weather, notice banner, and CTA.
*/

import { fetchContentBlock } from '@/lib/content-service';
import { fetchNormalizedWeather } from '@/lib/weather';
import Image from 'next/image';

type HeroData = {
  tagline: string;
  webcamUrl?: string;
  backgroundImageUrl?: string;
  noticeBanner?: { isVisible: boolean; text: string };
  cta?: { label: string; url: string };
};

export default async function Hero() {
  const [block, weather] = await Promise.all([
    fetchContentBlock('hero'),
    fetchNormalizedWeather({ revalidateSeconds: 3600 }),
  ]);
  const data = (block?.data as HeroData) || null;
  const bgUrl = (data?.backgroundImageUrl && data.backgroundImageUrl.trim()) || '/images/original/children_and_ski.jpg';
  return (
    <section id="hero" className="relative py-16 sm:py-20 scroll-mt-24">
      {bgUrl ? (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      ) : null}
      {/* overlay for readability */}
      {bgUrl ? (
        <div aria-hidden className="absolute inset-0 z-10 bg-white/10" />
      ) : null}
      <div className="relative z-20 container-base min-h-[560px] sm:min-h-[644px] translate-y-[100px] sm:translate-y-[200px] flex flex-col items-center justify-center text-center">
        <Image
          src="/images/original/logo.png"
          alt="SkiDráček logo"
          width={220}
          height={120}
          className="absolute z-30 left-1/2 -translate-x-1/2 top-[40px] sm:top-[80px]"
          priority
        />
        <div className="mt-6 w-full max-w-[720px] px-4">
          {/* White card (narrower) */}
          <div className="relative z-10 mx-auto w-full max-w-[600px] overflow-hidden rounded-[3px] bg-white p-4 pt-8 sm:p-6 sm:pt-10 text-primary">
            {/* Temperature (top-left) */}
            <div className="absolute left-3 top-3 inline-flex items-center rounded-sm bg-white px-2 py-0.5 text-sm text-primary">
              Teplota: {weather?.temperatureC !== null && weather?.temperatureC !== undefined ? Math.round(weather.temperatureC) + '°C' : '—°C'}
            </div>
            {/* Snow (top-right) */}
            <div className="absolute right-3 top-3 inline-flex items-center rounded-sm bg-white px-2 py-0.5 text-sm text-primary">
              Sníh: {weather?.snowDepthCm !== null && weather?.snowDepthCm !== undefined ? Math.round(weather.snowDepthCm) + ' cm' : '— cm'}
            </div>
          </div>
          {/* Blue stripe (wider than white card), rendered above the card */}
          <div className="relative z-20 mx-auto -mt-3 w-full max-w-[700px] rounded-[3px] bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground sm:-mt-4 sm:text-lg">
            {data?.tagline ?? 'Místní vlek a školička v Alšovicích.'}
          </div>
          {/* Notice message inside the white card, below the stripe */}
          {data?.noticeBanner?.isVisible && data?.noticeBanner?.text ? (
            <div className="relative z-10 mx-auto mt-[-2px] sm:mt-[-2px] w-full max-w-[600px] text-left text-primary">
              <div className="rounded-sm bg-white p-3 text-center">{data.noticeBanner.text}</div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


