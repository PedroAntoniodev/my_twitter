import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default PageRoutes;
