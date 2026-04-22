import { useState, useEffect } from "react";
import { fetchRates as fetchCurrencyRates } from "../utility/api";

const useCurrencyData = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      const data = await fetchCurrencyRates(baseCurrency);
      setRates(data.rates);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(); // first load

    const interval = setInterval(() => {
      fetchRates(); // auto refresh every 5 sec
    }, 5000);

    return () => clearInterval(interval);
  }, [baseCurrency]);

  return { rates, loading, error };
};

export default useCurrencyData;
