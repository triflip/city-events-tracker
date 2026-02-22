import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import EventTable from "../components/events/EventTable";
import { describe, it, expect, vi } from "vitest";

const mockEvents = [
  { id: 1, title: "Concert", category: "Música", date: "2024-01-01", location: "Barna" },
  { id: 2, title: "Exposició", category: "Art", date: "2024-01-02", location: "Madrid" },
  { id: 3, title: "Teatre", category: "Teatre", date: "2024-01-03", location: "Girona" },
  { id: 4, title: "Cinema", category: "Cinema", date: "2024-01-04", location: "Barna" },
  { id: 5, title: "Festival", category: "Música", date: "2024-01-05", location: "Barna" },
  { id: 6, title: "Xerrada", category: "Cultura", date: "2024-01-06", location: "Tarragona" },
];

describe("EventTable Component", () => {
  const mockOnDelete = vi.fn();

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("hauria de renderitzar només els primers 5 esdeveniments (paginació)", () => {
    renderWithRouter(<EventTable events={mockEvents} onDelete={mockOnDelete} />);
    
    expect(screen.getByText("Concert")).toBeInTheDocument();
    expect(screen.queryByText("Xerrada")).not.toBeInTheDocument();
  });

  it("hauria de cridar a onDelete quan es clica el botó d'esborrar", () => {
    renderWithRouter(<EventTable events={mockEvents} onDelete={mockOnDelete} />);
    
    const deleteIcons = screen.getAllByTestId("DeleteIcon");
    
    fireEvent.click(deleteIcons[0].parentElement);
    
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it("hauria de canviar de pàgina correctament", () => {
    renderWithRouter(<EventTable events={mockEvents} onDelete={mockOnDelete} />);
    
    const nextButton = screen.getByRole("button", { name: /següent/i });
    fireEvent.click(nextButton);
    
    expect(screen.getByText("Xerrada")).toBeInTheDocument();
  });
});