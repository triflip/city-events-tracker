import { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

import EventTableHeader from "./EventTableHeader";
import EventTableRow from "./EventTableRow";
import EventTablePagination from "./EventTablePagination";

export default function EventTable({ events, onDelete }) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  const sorted = [...events].sort((a, b) => {
    if (!sortField) return 0;
    const A = a[sortField];
    const B = b[sortField];
    if (A < B) return sortDirection === "asc" ? -1 : 1;
    if (A > B) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(start, start + itemsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <EventTableHeader onSort={handleSort} />
          <TableBody>
            {paginated.map(ev => (
              <EventTableRow key={ev.id} ev={ev} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EventTablePagination
        currentPage={currentPage}
        totalItems={sorted.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
