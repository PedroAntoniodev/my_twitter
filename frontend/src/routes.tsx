import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  );
};

export default PageRoutes;
