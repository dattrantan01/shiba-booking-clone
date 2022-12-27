import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import BookingLayout from "./components/layout/BookingLayout";
import Layout from "./components/layout/Layout";
import { SearchProvider } from "./context/search-context";
import BookingManagePage from "./pages/BookingManagePage";
import LocationDetailPage from "./pages/LocationDetailPage";
import LocationPage from "./pages/LocationPage";
import RoomDetail from "./pages/RoomDetail";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/auth-context";
import RegisterPage from "./pages/RegisterPage.js";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const requireAuth = () => {
    console.log("check auth");
  };
  return (
    <AuthProvider>
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
            <Route
              path="/booking"
              element={<BookingLayout />}
              onEnter={requireAuth}
            >
              <Route
                path="/booking/:status"
                element={<BookingManagePage />}
              ></Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/payment-success" element={<PaymentSuccess />}></Route>
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
