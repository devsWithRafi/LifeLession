'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>

      <pre className="max-w-4xl whitespace-pre-wrap text-sm">
        {error.message}
      </pre>

      <button onClick={reset} className="px-4 py-2 bg-black text-white rounded">
        Try again
      </button>
    </div>
  );
}
