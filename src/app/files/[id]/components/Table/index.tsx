// components/Table.tsx
import React from "react";
import type { Node } from "@/types/api";
import Loading from "@/components/Loading";

interface TableProps {
  item: Node;
  loading: boolean;
  error: string | null;
}

const RenderValue = (value: any) => {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return value;
};

const Table: React.FC<TableProps> = ({ item, loading, error }) => {
  return (
    <Loading loading={loading} error={error}>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {Object.keys(item.attributes).map((key, index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{RenderValue(item.attributes[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Loading>
  );
};

export default Table;
