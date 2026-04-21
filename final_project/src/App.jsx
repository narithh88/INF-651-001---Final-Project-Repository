import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Converter from "./pages/Converter";
import RatesTable from "./pages/RatesTable";

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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/rates" element={<RatesTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;