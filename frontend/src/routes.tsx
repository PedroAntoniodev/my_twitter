import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ConfigPage from "./pages/ConfigPage";
import MainLayout from "./layouts/MainLayout";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Página de login sem Sidebar */}
      <Route path="/" element={<AuthPage />} />

      {/* Páginas internas com Sidebar */}
      <Route
        path="/home"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        }
      />
      <Route
        path="/profile/update"
        element={
          <MainLayout>
            <ConfigPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
