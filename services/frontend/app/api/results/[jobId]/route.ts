import { NextResponse } from 'next/server';

const RESULTS_BASE_URL = 'http://localhost:4000';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  const url = `${RESULTS_BASE_URL}/api/results/${jobId}`;
  console.log('[PROXY] Fetching:', url);

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    const data = await res.json(); // ✅ read ONCE

    console.log('[PROXY] Status:', res.status);
    console.log('[PROXY] Data:', data);

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[PROXY] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}
