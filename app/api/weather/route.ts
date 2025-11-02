/*
  Weather API stub with hourly revalidation.
  - GET: returns sample provider-normalized payload
*/

export const revalidate = 3600;

export async function GET() {
  const nowIso = new Date().toISOString();
  const data = {
    temperatureC: -1,
    snowCm: 15,
    status: 'open',
    lastUpdated: nowIso,
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
    },
  });
}


