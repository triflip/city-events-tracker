import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchProvider } from "../context/SearchProvider";
import Navbar from "../components/ui/Navbar";
import { useSearch } from "../hooks/useSearch";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

const SearchResultChecker = () => {
  const { filters } = useSearch(); 
  return (
    <div data-testid="final-result">
      {filters?.query || "BUIT"}
    </div>
  );
};

describe("Integració: Sistema de Cerca", () => {
  it("hauria de reflectir el text cercat al context global", async () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <Navbar />
          <SearchResultChecker />
        </SearchProvider>
      </MemoryRouter>
    );

    const openBtn = screen.getByRole("button", { name: /🔍/i });
    fireEvent.click(openBtn);

    const input = screen.getByPlaceholderText(/escriu paraules clau/i);
    fireEvent.change(input, { target: { value: "Concert" } });
    
    const submitBtn = screen.getByRole("button", { name: /^cerca$/i });
    fireEvent.click(submitBtn);

    
    await waitFor(() => {
      const result = screen.getByTestId("final-result");
      expect(result.textContent).toBe("Concert");
    }, { timeout: 2000 });
  });
});