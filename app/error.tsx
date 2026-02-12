"use client";
// error must be a client component because it uses useEffect to log the error

import { useEffect } from "react";
import posthog from "posthog-js";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Capture the error with PostHog
    posthog.captureException(error);
    posthog.capture("error_occurred", {
      error_message: error.message,
      error_digest: error.digest,
    });
  }, [error]);

  const handleRetry = () => {
    posthog.capture("error_retry_clicked", {
      error_message: error.message,
    });
    reset();
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Something went wrong!</h1>
      <p className="text-center text-red-500">{error.message}</p>
      <button
        className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleRetry}
      >
        Try again
      </button>
    </div>
  );
}
