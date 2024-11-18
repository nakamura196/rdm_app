"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import { useFetchFilesById } from "@/hooks/useFetchNodes";
// import Table from "./components/Table";
import Table from "./components/Table";
import { useParams } from "next/navigation";

export default function AppProject() {
  const { session } = useAuth(); // useAuth フックを使用

  // const
  const params = useParams<{ id: string }>();

  const {
    data: item,
    error,
    loading,
  } = useFetchFilesById(session?.accessToken || null, params.id);

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
        {!loading && !error && item && (
          <>
            <Table item={item} loading={loading} error={error} />
          </>
        )}
      </div>
    </>
  );
}
