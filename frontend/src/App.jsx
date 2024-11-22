import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerificationPage from "./pages/verificationForm/VerificationPage";
import CardPage from "./pages/cardPage/CardPage";

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
