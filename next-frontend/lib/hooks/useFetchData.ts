// lib/hooks/useFetchData.tsx
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

  const buildQueryParams = (
    params?: Record<string, string | number | boolean>
  ) => {
    if (!params) return "";
    return "?" + new URLSearchParams(params as Record<string, string>).toString();
  };

  async function fetchData() {
    try {
      if (!learnerId || isNaN(learnerId)) {
        throw new Error("Invalid learner ID");
      }

      const queryString = buildQueryParams(options?.queryParams);
      const url = `http://localhost:5115/api/learners/${learnerId}/${endpoint}${queryString}`;

      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Resource not found at: ${url}`);
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const jsonData = await res.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (learnerId) fetchData();
  }, [learnerId, endpoint, JSON.stringify(options?.queryParams)]);

  return { data, loading, error, refetch: fetchData };
}