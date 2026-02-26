import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import World from "./pages/World.jsx";

export default function App() {
  return (
    <Routes>
      {/* 首頁 */}
      <Route path="/" element={<Navigate to="/world" replace />} />

      {/* 進入參觀後的世界 */}
      <Route path="/world" element={<World />} />
    </Routes>
  );
}
