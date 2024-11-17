// components/Table.tsx
import React from "react";
import type { Node } from "@/types/api";

interface TableProps {
  items: Node[];
  loading: boolean;
  error: string | null;
}

const Table: React.FC<TableProps> = ({ items, loading, error }) => {
  return (
    <div className="overflow-x-auto">
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
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>date_modified</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.attributes.title}</td>
                <td>{item.attributes.date_modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
