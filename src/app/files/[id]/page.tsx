"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import { useFetchFilesById } from "@/hooks/useFetchNodes";
import Table from "./components/Table";
import Loading from "@/components/Loading";
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
      <Loading loading={loading} error={error}>
        {item && <Table item={item} loading={loading} error={error} />}
      </Loading>
    </>
  );
}
