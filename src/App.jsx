import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerificationPage from "./VerificationPage";
import CardPage from "./CardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerificationPage />} />
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
