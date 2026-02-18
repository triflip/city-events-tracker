import { useLoadEvents } from "../hooks/useLoadEvents";
import EventsByCategoryDonut from "../components/charts/EventsByCategoryDonut";

export default function Charts() {
  const { events, loading, error } = useLoadEvents();

  if (loading) return <p className="p-6">Carregant dades...</p>;
  if (error) return <p className="p-6 text-red-600">Error carregant dades</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gràfics</h1>

      <h2 className="text-xl font-semibold mb-4">Esdeveniments per categoria</h2>
      <EventsByCategoryDonut events={events} />
    </div>
  );
}
