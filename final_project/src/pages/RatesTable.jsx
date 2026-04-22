import useCurrencyData from "../hooks/useCurrencyData";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useContext, useState, useEffect, useRef } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

// popular currencies
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

// flags
const currencyFlags = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CNY: "🇨🇳",
  AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭",
  SGD: "🇸🇬", HKD: "🇭🇰",
  KRW: "🇰🇷", INR: "🇮🇳",
  THB: "🇹🇭", MYR: "🇲🇾", IDR: "🇮🇩", VND: "🇻🇳", PHP: "🇵🇭",
  AED: "🇦🇪", SAR: "🇸🇦",
  ZAR: "🇿🇦",
  KHR: "🇰🇭"
};

const getFlag = (currency) => {
  if (currencyFlags[currency]) return currencyFlags[currency];
  const code = currency.slice(0, 2);
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
};

function RatesTable() {
  const { rates, loading, error } = useCurrencyData("USD");
  const { favorites, toggleFavorite } = useContext(CurrencyContext);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("name");

  // store previous rates
  const prevRatesRef = useRef({});

  useEffect(() => {
    prevRatesRef.current = rates;
  }, [rates]);

  let currencyList = Object.entries(rates || {}).filter(
    ([currency]) => popularCurrencies.includes(currency)
  );

  // search
  currencyList = currencyList.filter(([currency]) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  // sorting
  if (sortType === "name") {
    currencyList.sort(([a], [b]) => a.localeCompare(b));
  } else if (sortType === "rate") {
    currencyList.sort(([, aRate], [, bRate]) => bRate - aRate);
  } else if (sortType === "favorite") {
    currencyList.sort(([a], [b]) => {
      const aFav = favorites.includes(`RATE-${a}`);
      const bFav = favorites.includes(`RATE-${b}`);

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.localeCompare(b);
    });
  }

  // indicator logic
  const getTrend = (currency, rate) => {
    const prev = prevRatesRef.current?.[currency];

    if (!prev) return "➖";
    if (rate > prev) return "🔼";
    if (rate < prev) return "🔽";
    return "➖";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">📊 Exchange Rates (USD)</h2>

        {/* search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* sort */}
        <div className="mb-3">
          <select
            className="form-select"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="rate">Sort by Rate</option>
            <option value="favorite">⭐ Sort by Favorite</option>
          </select>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th>Trend</th>
                <th>Favorite</th>
              </tr>
            </thead>

            <tbody>
              {currencyList.map(([currency, rate]) => (
                <tr key={currency}>
                  <td>
                    {getFlag(currency)} {currency}
                  </td>

                  <td>{rate.toFixed(4)}</td>

                  <td>{getTrend(currency, rate)}</td>

                  <td>
                    <button
                      className={`btn btn-sm ${
                        favorites.includes(`RATE-${currency}`)
                          ? "btn-warning"
                          : "btn-outline-warning"
                      }`}
                      onClick={() => toggleFavorite(`RATE-${currency}`)}
                    >
                      {favorites.includes(`RATE-${currency}`)
                        ? "★ Added"
                        : "☆ Add"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}

export default RatesTable;