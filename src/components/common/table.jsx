import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableWrapper from "./tableWrapper";

const Table = ({ columns, onSort, sortColumn, data }) => {
  return (
    <TableWrapper>
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </TableWrapper>
  );
};

export default Table;
