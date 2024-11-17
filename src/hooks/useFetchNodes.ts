import { useState, useEffect } from "react";
import { fetchNodes } from "@/services/api";
import { Node } from "@/types/api";

export const useFetchNodes = (accessToken: string | null) => {
  const [data, setData] = useState<Node[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchNodes(accessToken);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accessToken]);

  return { data, error, loading };
};
