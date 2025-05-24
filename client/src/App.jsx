import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <main className="min-h-[100dvh] bg-[#FFDCDC]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
