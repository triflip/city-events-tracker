import { renderHook, waitFor } from "@testing-library/react";
import { getAllEvents } from "../lib/events";
import { useLoadEvents } from "../hooks/useLoadEvents";

vi.mock("../lib/events");

describe("useLoadEvents", () => {

  test("carrega esdeveniments correctament", async () => {
    const fakeEvents = [
      { id: 1, title: "Concert" },
      { id: 2, title: "Exposició" }
    ];

    getAllEvents.mockResolvedValue(fakeEvents);

    const { result } = renderHook(() => useLoadEvents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.events).toEqual(fakeEvents);
    expect(result.current.error).toBe(null);
  });

  test("gestiona l'estat de càrrega", async () => {
    getAllEvents.mockResolvedValue([]);

    const { result } = renderHook(() => useLoadEvents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  test("gestiona errors de Supabase", async () => {
    getAllEvents.mockRejectedValue(new Error("Error Supabase"));

    const { result } = renderHook(() => useLoadEvents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.events).toEqual([]);
  });

});
