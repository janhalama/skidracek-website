/**
 * Server-only weather fetcher using Open-Meteo.
 * Normalizes temperature (°C), snow depth (cm), and last-updated ISO.
 */

type NormalizedWeather = {
  temperatureC: number | null;
  snowDepthCm: number | null;
  lastUpdatedIso: string | null;
};

/*
  Fetches current weather from Open-Meteo for configured lat/lon.
  Uses Next.js cache revalidation via the caller's options.
*/
export async function fetchNormalizedWeather(options?: { revalidateSeconds?: number }): Promise<NormalizedWeather> {
  const latStr = process.env.WEATHER_LAT;
  const lonStr = process.env.WEATHER_LON;
  if (!latStr || !lonStr) {
    return { temperatureC: null, snowDepthCm: null, lastUpdatedIso: null };
  }

  const latitude = Number(latStr);
  const longitude = Number(lonStr);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,snow_depth&timezone=auto`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: options?.revalidateSeconds ? { revalidate: options.revalidateSeconds } : undefined,
    });
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const json: any = await res.json();
    const current = json?.current ?? {};
    const temperatureC = typeof current.temperature_2m === 'number' ? current.temperature_2m : null;
    const snowDepthCm = typeof current.snow_depth === 'number' ? current.snow_depth : null;
    const lastUpdatedIso = typeof current.time === 'string' ? current.time : null;
    return { temperatureC, snowDepthCm, lastUpdatedIso };
  } catch {
    return { temperatureC: null, snowDepthCm: null, lastUpdatedIso: null };
  } finally {
    clearTimeout(timeout);
  }
}


