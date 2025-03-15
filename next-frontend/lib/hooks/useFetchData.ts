"use client";
import { useState, useEffect } from "react";

interface FetchOptions {
  queryParams?: Record<string, string | number | boolean>;
}

export function useFetchData<T>(
  endpoint: string,
  learnerId: number,
  options?: FetchOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 تكوين `query params` إذا وُجدت
  function buildQueryParams(
    params?: Record<string, string | number | boolean>
  ) {
    if (!params) return "";
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value.toString());
      }
    });
    return queryString.toString() ? `?${queryString.toString()}` : "";
  }

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const queryString = buildQueryParams(options?.queryParams);
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/learners/${learnerId}/${endpoint}${queryString}`;

      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok)
        throw new Error(`Failed to fetch ${endpoint}, Status: ${res.status}`);

      const jsonData = await res.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (learnerId) fetchData();
  }, [learnerId, endpoint, JSON.stringify(options?.queryParams)]);

  return { data, loading, error, refetch: fetchData };
}
