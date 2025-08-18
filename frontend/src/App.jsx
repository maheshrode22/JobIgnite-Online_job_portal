import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoutes from "./routes/homeRoutes";
import HrRoutes from "./routes/HrRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
         <Route path="/hr/*" element={<HrRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
