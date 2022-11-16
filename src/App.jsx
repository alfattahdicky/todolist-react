import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailActivity from "./pages/DetailActivity";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/activity-group/:id" element={<DetailActivity />} />
    </Routes>
  )
}

export default App
