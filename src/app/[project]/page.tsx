"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import { useFetchProjectFiles } from "@/hooks/useFetchNodes";
import Table from "./components/Table";
import { useParams } from "next/navigation";

export default function AppProject() {
  const { session } = useAuth(); // useAuth フックを使用

  // const
  const params = useParams<{ project: string }>();

  const {
    data: items,
    error,
    loading,
  } = useFetchProjectFiles(session?.accessToken || null, params.project);

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
          <Table
            project={params.project}
            items={items}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </>
  );
}
