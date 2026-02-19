import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { useLoadEvents } from "../hooks/useLoadEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "../components/ui/EventModal";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function CustomToolbar({ label, onNavigate }) {
  return (
    <div className="relative flex items-center justify-center mb-4 min-h-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onNavigate("PREV")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          ◀
        </button>

        <span className="text-xl font-semibold min-w-50 text-center">
          {label}
        </span>

        <button
          type="button"
          onClick={() => onNavigate("NEXT")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          ▶
        </button>
      </div>

      <div className="absolute right-0">
        <button
          type="button"
          onClick={() => onNavigate("TODAY")}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm font-medium transition-colors"
        >
          Avui
        </button>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { events, loading, error } = useLoadEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p className="p-6">Carregant esdeveniments...</p>;
  if (error) return <p className="p-6 text-red-600">Error carregant dades</p>;

  const calendarEvents = events.map((ev) => ({
    title: ev.title,
    start: new Date(ev.date),
    end: new Date(ev.date),
    description: ev.description,
    image_url: ev.image_url,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendari d'esdeveniments</h1>

      <div className={isModalOpen ? "blur-sm pointer-events-none" : ""}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          components={{ toolbar: CustomToolbar }}
          style={{ height: 500 }}
        />
      </div>
      {isModalOpen && (
  <EventModal
    event={selectedEvent}
    onClose={() => setIsModalOpen(false)}
  />
)}

    </div>
  );
}
