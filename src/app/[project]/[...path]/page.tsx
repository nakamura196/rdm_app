"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import { useFetchFiles } from "@/hooks/useFetchNodes";
import Table from "./components/Table";
import { useParams } from "next/navigation";

export default function AppProject() {
  const { session } = useAuth(); // useAuth フックを使用

  // const
  const params = useParams<{ project: string; path: string[] }>();

  const { project, path } = params;

  const {
    data: items,
    error,
    loading,
  } = useFetchFiles(session?.accessToken || null, project, path);

  return (
    <>
      <div className="container mx-auto py-10">
        {loading && (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}
        {error && (
          <div className="alert alert-error mb-4">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <>
            <Table
              items={items}
              project={project}
              loading={loading}
              error={error}
            />
          </>
        )}
      </div>
    </>
  );
}
