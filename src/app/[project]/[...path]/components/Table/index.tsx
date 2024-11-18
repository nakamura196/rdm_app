// components/Table.tsx
import React from "react";
import type { Node } from "@/types/api";
import Link from "next/link";
import Loading from "@/components/Loading";

interface TableProps {
  project: string;
  items: Node[];
  loading: boolean;
  error: string | null;
}

const Table: React.FC<TableProps> = ({ project, items, loading, error }) => {
  return (
    <Loading loading={loading} error={error}>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>kind</th>
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
              <td>{item.attributes.kind}</td>
              <td>{item.attributes.provider}</td>
              <td>
                {item.attributes.kind === "file" ? (
                  <Link
                    className="link link-primary"
                    href={`/files/${item.id}`}
                  >
                    {"Detail"}
                  </Link>
                ) : (
                  <Link
                    className="link link-primary"
                    href={`/${project}/${item.attributes.provider}${item.attributes.path}`}
                  >
                    {"Children"}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Loading>
  );
};

export default Table;
