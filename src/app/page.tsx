"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import { useFetchNodes } from "@/hooks/useFetchNodes";
import Hero from "./components/Hero";
import Table from "./components/Table";

export default function MyData() {
  const { session, handleSignIn } = useAuth(); // useAuth フックを使用

  const {
    data: items,
    error,
    loading,
  } = useFetchNodes(session?.accessToken || null);

  return (
    <>
      {session ? (
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
            <Table items={items} loading={loading} error={error} />
          )}
        </div>
      ) : (
        <Hero handleSignIn={handleSignIn} />
      )}
    </>
  );
}
