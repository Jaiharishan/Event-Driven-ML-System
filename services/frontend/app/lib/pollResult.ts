type PollOptions = {
  intervalMs?: number;
  maxAttempts?: number;
};

export async function pollResult(
  jobId: string,
  onUpdate: (data: any) => void,
  onError: (error: string) => void,
  options?: PollOptions
) {
  const intervalMs = options?.intervalMs ?? 1500;
  const maxAttempts = options?.maxAttempts ?? 40;

  let attempts = 0;
  let stopped = false;

  const poll = async () => {
    if (stopped) return;
    attempts++;

    try {
      const res = await fetch(`/api/results/${jobId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      onUpdate(data);

      if (data.status === "completed" || data.status === "failed") {
        stopped = true;
        return;
      }

      if (attempts >= maxAttempts) {
        stopped = true;
        onError("Timed out waiting for result");
        return;
      }
    } catch (err) {
      if (attempts >= maxAttempts) {
        stopped = true;
        onError("Polling failed");
        console.error(err);
        return;
      }
    }

    const jitter = Math.random() * 300;
    setTimeout(poll, intervalMs + jitter);
  };

  poll();

  // allow manual stop if needed later
  return () => {
    stopped = true;
  };
}
