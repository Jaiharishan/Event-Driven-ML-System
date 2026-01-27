import { NextResponse } from 'next/server';

const INGESTION_BASE_URL = "http://localhost:3000";
// example: http://localhost:3000

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${INGESTION_BASE_URL}/api/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Proxy classify error:', error);
    return NextResponse.json(
      { error: 'Failed to submit classification job' },
      { status: 500 }
    );
  }
}
