export default function Loading({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto py-10 px-4">
      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && <>{children}</>}
    </div>
  );
}
