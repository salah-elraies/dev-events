"use client";
// error must be a client component because it uses useEffect to log the error

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Something went wrong!</h1>
      <p className="text-center text-red-500">{error.message}</p>
      <button
        className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
