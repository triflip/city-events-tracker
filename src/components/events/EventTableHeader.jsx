import { TableHead, TableRow, TableCell } from "@mui/material";

export default function EventTableHeader({ onSort }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell><strong>Imatge</strong></TableCell>

        <TableCell onClick={() => onSort("title")} style={{ cursor: "pointer" }}>
          <strong>Títol</strong>
        </TableCell>

        <TableCell onClick={() => onSort("category")} style={{ cursor: "pointer" }}>
          <strong>Categoria</strong>
        </TableCell>

        <TableCell onClick={() => onSort("date")} style={{ cursor: "pointer" }}>
          <strong>Data</strong>
        </TableCell>

        <TableCell onClick={() => onSort("location")} style={{ cursor: "pointer" }}>
          <strong>Ubicació</strong>
        </TableCell>

        <TableCell align="right"><strong>Accions</strong></TableCell>
      </TableRow>
    </TableHead>
  );
}
