// components/Table.tsx
import React from "react";
import type { Node } from "@/types/api";
import Link from "next/link";
interface TableProps {
  project: string;
  items: Node[];
  loading: boolean;
  error: string | null;
}

const Table: React.FC<TableProps> = ({ project, items, loading, error }) => {
  return (
    <div className="overflow-x-auto px-4">
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
              <th>provider</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.attributes.name}</td>
                <td>{item.attributes.provider}</td>
                <td>
                  <Link
                    className="link link-primary"
                    href={`/${project}/${item.attributes.name}`}
                  >
                    {"Detail"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
