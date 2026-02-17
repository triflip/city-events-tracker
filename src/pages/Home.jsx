import { useNavigate } from "react-router-dom";
import { useLoadEvents } from "../hooks/useLoadEvents";
import { deleteEventById } from "../lib/events";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const { events, setEvents, loading, error } = useLoadEvents();
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (!confirm("Segur que vols eliminar aquest esdeveniment?")) return;

    try {
      await deleteEventById(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch  {
      alert("No s'ha pogut eliminar l'esdeveniment");
    }
  }

  if (loading) return <p className="p-6">Carregant...</p>;
  if (error) return <p className="p-6 text-red-600">Error carregant events</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Llista d'esdeveniments</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Títol</strong>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
              </TableCell>
              <TableCell>
                <strong>Data</strong>
              </TableCell>
              <TableCell>
                <strong>Ubicació</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Accions</strong>
              </TableCell>
              <TableCell>
                <strong>Imatge</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((ev) => (
              <TableRow key={ev.id}>
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

                  <IconButton color="error" onClick={() => handleDelete(ev.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
