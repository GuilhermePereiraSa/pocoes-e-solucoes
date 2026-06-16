import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Admin from "../pages/Admin.jsx";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
