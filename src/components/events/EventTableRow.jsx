import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function EventTableRow({ ev, onDelete }) {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>
        <img
          src={ev.image_url}
          alt={ev.title}
          style={{
            width: "80px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      </TableCell>

      <TableCell>{ev.title}</TableCell>
      <TableCell>{ev.category}</TableCell>
      <TableCell>{new Date(ev.date).toLocaleString()}</TableCell>
      <TableCell>{ev.location}</TableCell>

      <TableCell align="right">
        <IconButton onClick={() => navigate(`/events/edit/${ev.id}`)}>
          <EditIcon />
        </IconButton>

        <IconButton color="error" onClick={() => onDelete(ev.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
