import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import React, { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Converter = lazy(() => import("./pages/Converter"));
const RatesTable = lazy(() => import("./pages/RatesTable"));

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg px-4" style={{
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)"
      }}>
        <span className="navbar-brand text-white fw-bold">
          💱 Currency App
        </span>
        <div className="ms-auto d-flex gap-3">
          <Link className="nav-link text-light" to="/">Home</Link>
          <Link className="nav-link text-light" to="/converter">Converter</Link>
          <Link className="nav-link text-light" to="/rates">Rates</Link>
        </div>
      </nav>

      {/* Routes with Suspense */}
      <Suspense fallback={<div className="text-center my-5">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/rates" element={<RatesTable />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;