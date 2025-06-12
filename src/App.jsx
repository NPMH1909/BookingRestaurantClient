import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage";
import VideoIntroPage from "./pages/VideoIntroPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import PromotionPage from "./pages/PromotionPage";
import AboutUsPage from "./pages/AboutUsPage";
import LoginPage from "./pages/LoginPage";
import NearbyRestaurants from "./pages/NearbyRestaurants";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import FavoriteRestaurantPage from "./pages/FavoriteRestaurantPage";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import RestaurantOwnerLayout from "./layouts/RestaurantOwnerLayout";
import LoginAdmin from "./pages/LoginAdmin";
import Checkoutpage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPage";
import UpdatePassPage from "./pages/UpdatePassPage";
import EmployeePage from "./pages/EmployeePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginAd" element={<LoginAdmin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/update-password" element={<UpdatePassPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantPage />} />
          <Route path="/restaurants/promotions" element={<PromotionPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/nearby" element={<NearbyRestaurants />} />
          <Route path="checkout" element={<Checkoutpage />} />

        </Route>

        <Route path="/" element={<Layout showFooter={false} />}>
          <Route path="/restaurants/introductions" element={<VideoIntroPage />} />
        </Route>

        <Route path="/" element={<UserLayout showSidebar={true} />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/favourite-restaurant" element={<FavoriteRestaurantPage />} />
        </Route>
        <Route path="/staff" element={<EmployeePage />} />

        <Route path="/dashboard" element={<RestaurantOwnerLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        RestaurantOwnerLayout
      </Routes>
    </BrowserRouter>
  )
}

export default App
