import { useState } from "react";
import useCurrencyData from "../hooks/useCurrencyData";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import CurrencySelector from "../components/CurrencySelector";

//  keep same list everywhere
const popularCurrencies = [
  "USD", "EUR", "GBP", "JPY", "CNY",
  "AUD", "CAD", "CHF",
  "SGD", "HKD",
  "KRW", "INR",
  "THB", "MYR", "IDR", "VND", "PHP",
  "AED", "SAR",
  "ZAR",
  "KHR"
];

const HomeDashboard = () => {
  const { rates, loading, error } = useCurrencyData("USD");

  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KHR");

  // loading
  if (loading && Object.keys(rates).length === 0) {
    return <LoadingSpinner />;
  }

  if (error) return <ErrorMessage message={error} />;
  if (!rates[from] || !rates[to]) return null;

  const rate = rates[to] / rates[from];
  const result = (amount * rate).toFixed(2);

  //  filter currencies
  const filteredCurrencies = Object.keys(rates).filter((c) =>
    popularCurrencies.includes(c)
  );

  //  ALWAYS show USD + KHR
  const displayCurrencies = [
    "USD",
    "KHR",
    ...filteredCurrencies
      .filter(c => c !== "USD" && c !== "KHR")
      .slice(0, 4)
  ];

  return (
    <div className="row mt-4 g-4">

      {/* 📊 LIVE RATES */}
      <div className="col-md-6">
        <div
          className="p-4 rounded-4"
          style={{
            background: "#ffffff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h4 className="mb-3 text-dark">📊 Live Rates</h4>

          <div className="row">
            {displayCurrencies.map((code) => (
              <div key={code} className="col-6 mb-3 text-center">

                <div
                  className="p-3 rounded"
                  style={{
                    background: "#f9fafb",
                    border: "1px solid #eee"
                  }}
                >
                  <small className="text-muted">{code} → USD</small>

                  <div className="fw-bold text-dark">
                    {rates[code]?.toFixed(4)}
                  </div>

                  {code === "KHR" && (
                    <span className="badge bg-warning text-dark">
                      Popular
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/*QUICK CONVERT */}
      <div className="col-md-6">
        <div
          className="p-4 rounded-4"
          style={{
            background: "#ffffff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h4 className="mb-3 text-dark">💱 Quick Convert</h4>

          {/* amount */}
          <input
            type="number"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* FLAG DROPDOWN */}
          <div className="d-flex gap-2 align-items-center mb-3">

            <CurrencySelector
              value={from}
              onChange={setFrom}
              options={filteredCurrencies}
            />

            <span className="text-dark">→</span>

            <CurrencySelector
              value={to}
              onChange={setTo}
              options={filteredCurrencies}
            />

          </div>

          <h3 className="fw-bold text-dark">
            {result} {to}
          </h3>
        </div>
      </div>

    </div>
  );
};

export default HomeDashboard;