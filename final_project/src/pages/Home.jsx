import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { Link } from "react-router-dom";
import HomeDashboard from "../components/HomeDashboard";

function Home() {
  const { favorites } = useContext(CurrencyContext);

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">💱 Currency Exchange</h1>
        <p className="text-secondary">
          Real-time currency exchange rates with conversion tools and modern UI
        </p>
      </div>

      {/* DASHBOARD */}
      <HomeDashboard />

      {/* CARDS */}
      <div className="row mt-5 g-4">

        <div className="col-md-6">
          <div className="p-4 rounded-4 shadow card-glass text-center">
            <h4>🔄 Convert Currency</h4>
            <p className="text-secondary">Fast and accurate</p>
            <Link to="/converter" className="btn btn-primary w-100">
              Open Converter
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 rounded-4 shadow card-glass text-center">
            <h4>📊 Exchange Rates</h4>
            <p className="text-secondary">View all rates</p>
            <Link to="/rates" className="btn btn-success w-100">
              View Rates
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;