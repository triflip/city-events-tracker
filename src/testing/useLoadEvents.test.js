import { renderHook, waitFor } from "@testing-library/react";
import { useLoadEvents } from "../hooks/useLoadEvents";
import { fetchEvents } from "../lib/events";

vi.mock("../lib/events", () => ({
  fetchEvents: vi.fn()
}));

describe("useLoadEvents", () => {

  test("hauria de carregar esdeveniments correctament", async () => {
    const fakeEvents = [
      { id: 1, title: "Concert" },
      { id: 2, title: "Exposició" }
    ];

    fetchEvents.mockResolvedValue(fakeEvents);

    const { result } = renderHook(() => useLoadEvents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.events).toEqual(fakeEvents);
    expect(result.current.error).toBe(null);
  });

});
