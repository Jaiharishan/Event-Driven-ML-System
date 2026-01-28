'use client';

import { useEffect, useState } from 'react';

type JobStatus = 'accepted' | 'processing' | 'completed' | 'failed';

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll results service
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/results/${jobId}`);
        const data = await res.json();
        console.log('Fetched results:', data);
        console.log('jobId:', jobId);

        setStatus(data.status);

        if (data.status === 'completed' || data.status === 'failed') {
          setResult(data);
          console.log('Polled status:', data);
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch results');
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  async function submitJob() {
    setLoading(true);
    setError(null);
    setResult(null);
    setStatus(null);

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_uri:imageUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit classification job');
      }

      const data = await res.json();
      setJobId(data.job_id);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
      setError('Failed to submit job');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-900 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Kafka-based ML Image Classification
        </h1>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={submitJob}
          disabled={loading || !imageUrl}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 py-2 rounded font-medium transition"
        >
          {loading ? 'Submitting…' : 'Classify Image'}
        </button>

        {jobId && (
          <div className="bg-gray-800 rounded p-4 space-y-2">
            <p className="text-sm">
              <span className="text-gray-400">Job ID:</span>{' '}
              <span className="font-mono break-all">{jobId}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Status:</span>{' '}
              <span className="font-semibold capitalize">{status}</span>
            </p>
          </div>
        )}

        {result && (
          <div className="bg-gray-800 rounded p-4">
            <h2 className="font-semibold mb-2">Result</h2>
            <pre className="text-sm bg-black p-3 rounded overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </main>
  );
}
