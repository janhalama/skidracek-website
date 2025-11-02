/*
  Content API.
  - GET: returns one block (?slug=...) or all blocks; public cache 1h
  - PUT: 501 Not Implemented (writes will be added with admin auth)
*/

import { fetchAllContentBlocks, fetchContentBlock, upsertContentBlock } from '@/lib/content-service';
import { requireAdmin } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  try {
    if (slug) {
      const block = await fetchContentBlock(slug);
      return new Response(JSON.stringify({ ok: true, block }), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
        },
      });
    }

    const blocks = await fetchAllContentBlocks();
    return new Response(JSON.stringify({ ok: true, blocks }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unauthorized';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 403,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  try {
    const body = await request.json();
    const slug = typeof body?.slug === 'string' ? body.slug : null;
    if (!slug) throw new Error('Missing slug');
    const data = body?.data;
    const saved = await upsertContentBlock(slug, data);
    return new Response(JSON.stringify({ ok: true, block: saved }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}


