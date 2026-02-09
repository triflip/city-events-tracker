import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import EventList from "../pages/Events/EventList";
import EventCreate from "../pages/Events/EventCreate";
import EventEdit from "../pages/Events/EventEdit";
import MapPage from "../pages/Map";



export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/events" element={<EventList />} />
          <Route path="/events/create" element={<EventCreate />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
          <Route path="/map" element={<MapPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
