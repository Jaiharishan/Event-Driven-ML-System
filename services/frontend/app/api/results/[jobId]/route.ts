import { NextResponse } from 'next/server';

const RESULTS_BASE_URL = "http://localhost:4000";
// example: http://localhost:4000

export async function GET(
  _req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const res = await fetch(
      `${RESULTS_BASE_URL}/api/results/${params.jobId}`
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Proxy results error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}
