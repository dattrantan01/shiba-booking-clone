import { Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import Layout from "./components/layout/Layout";
import { SearchProvider } from "./context/search-context";
import LocationDetailPage from "./pages/LocationDetailPage";
import LocationPage from "./pages/LocationPage";
import RoomDetail from "./pages/RoomDetail";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/location" element={<LocationPage />}></Route>
          <Route
            path="/location-detail/:id"
            element={<LocationDetailPage />}
          ></Route>
          <Route
            path="/location-detail/:locationId/rooms/:id"
            element={<RoomDetail />}
          ></Route>
        </Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;
