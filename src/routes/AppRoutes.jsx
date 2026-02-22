import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Charts from "../pages/Charts";
import CalendarPage from "../pages/Calendar";
import MapPage from "../pages/Map";
import EventCreate from "../pages/Events/EventCreate";
import EventEdit from "../pages/Events/EventEdit";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/events/create" element={<EventCreate />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}