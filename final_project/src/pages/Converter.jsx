import { useState, useContext } from "react";
import useCurrencyData from "../hooks/useCurrencyData";
import CurrencySelector from "../components/CurrencySelector";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { CurrencyContext } from "../context/CurrencyContext";

// ⭐ same popular list as RatesTable
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

function Converter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KHR");

  const { toggleFavorite, favorites } = useContext(CurrencyContext);

  const { rates, loading, error } = useCurrencyData(from);

  // filter currencies
  const currencies = Object.keys(rates || {}).filter((c) =>
    popularCurrencies.includes(c)
  );

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) setAmount(value);
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const converted =
    rates && rates[to] ? (amount * rates[to]).toFixed(2) : 0;

  // converter favorites 
  const converterFavorites = favorites.filter(
    (fav) => !fav.startsWith("RATE-")
  );

  // favorite logic
  const pair = `${from}-${to}`;
  const isSaved = favorites.includes(pair);

  // load favorite into converter
  const handleSelectFavorite = (fav) => {
    const [f, t] = fav.split("-");
    setFrom(f);
    setTo(t);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>

        <h2 className="text-center mb-4">💱 Converter</h2>

        {/* Amount */}
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="form-control mb-3"
        />

        {/* Selectors */}
        <div className="d-flex gap-2 mb-3">
          <CurrencySelector value={from} onChange={setFrom} options={currencies} />
          <CurrencySelector value={to} onChange={setTo} options={currencies} />
        </div>

        {/* Swap */}
        <button
          className="btn btn-secondary w-100 mb-3"
          onClick={swapCurrencies}
        >
          🔄 Swap
        </button>

        {/* Loading & Error */}
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {/* Result */}
        {!loading && !error && (
          <h4 className="text-center">
            {amount} {from} = {converted} {to}
          </h4>
        )}

        {/* Save Favorite */}
        <button
          className={`btn w-100 mt-3 ${isSaved ? "btn-warning" : "btn-success"}`}
          onClick={() => toggleFavorite(pair)}
        >
          {isSaved ? "⭐ Saved" : "⭐ Save Favorite"}
        </button>

        {/* Favorites List */}
        {converterFavorites.length > 0 && (
          <div className="mt-4 p-3 border rounded bg-light text-dark">
            <h5 className="mb-3">⭐ Favorites</h5>

            {converterFavorites.map((fav, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-2 p-2 rounded"
                style={{ background: "#f1f1f1" }}
              >
                {/* Display */}
                <span style={{ fontWeight: "500" }}>
                  {fav.replace("-", " → ")}
                </span>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleSelectFavorite(fav)}
                  >
                    Use
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => toggleFavorite(fav)}
                  >
                    ❌
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Converter;