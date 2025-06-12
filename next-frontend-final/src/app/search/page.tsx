"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

let debounceTimeout: NodeJS.Timeout;

export default function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    // Debounce: انتظر 400ms بعد آخر كتابة قبل إرسال الطلب
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/learners/${user.id}/search?Term=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to search");
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to search");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(debounceTimeout);
  }, [query, user?.id]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search for anything..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {/* {loading && <div className="text-muted-foreground">Loading...</div>} */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && !error && results.length === 0 && query && (
        <div className="text-muted-foreground">No results found.</div>
      )}
      <div className="space-y-4">
        {results.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
            <div className="text-xs uppercase text-muted-foreground font-semibold tracking-widest">{item.entityType}</div>
            <div className="font-bold text-lg">{item.title}</div>
            {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
