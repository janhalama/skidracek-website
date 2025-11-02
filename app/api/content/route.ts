/*
  Content API stub.
  - GET: returns sample JSON with no-store cache (setup placeholder)
  - PUT: 501 Not Implemented (to be implemented in MVP)
*/

export const runtime = 'nodejs';

export async function GET() {
  const data = {
    ok: true,
    blocks: [],
    message: 'Content API stub',
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function PUT() {
  return new Response(
    JSON.stringify({ ok: false, error: 'Not Implemented', message: 'Use GET for now.' }),
    { status: 501, headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}


