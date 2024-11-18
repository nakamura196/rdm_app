import { useState, useEffect } from "react";
import {
  fetchNodes,
  fetchProjectFiles,
  fetchFiles,
  fetchFilesById,
} from "@/services/api";
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

export const useFetchProjectFiles = (
  accessToken: string | null,
  projectId: string
) => {
  const [data, setData] = useState<Node[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchProjectFiles(accessToken, projectId);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accessToken, projectId]);

  return { data, error, loading };
};

export const useFetchFiles = (
  accessToken: string | null,
  project: string,
  path: string[]
) => {
  const [data, setData] = useState<Node[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFiles(accessToken, project, path);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accessToken, project, path]);

  return { data, error, loading };
};

export const useFetchFilesById = (accessToken: string | null, id: string) => {
  const [data, setData] = useState<Node>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFilesById(accessToken, id);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accessToken, id]);

  return { data, error, loading };
};
