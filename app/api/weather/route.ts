/**
 * Weather API: returns normalized current weather.
 * Publicly cacheable for 1 hour; handles provider failures with neutral values.
 */

export const runtime = 'nodejs';

import { fetchNormalizedWeather } from '@/lib/weather';

export async function GET() {
  try {
    const data = await fetchNormalizedWeather({ revalidateSeconds: 3600 });
    return new Response(JSON.stringify({ ok: true, data }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    });
  } catch {
    // Should not happen; fetchNormalizedWeather already swallows provider errors
    return new Response(JSON.stringify({ ok: true, data: { temperatureC: null, snowDepthCm: null, lastUpdatedIso: null } }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}

export const revalidate = 3600;


