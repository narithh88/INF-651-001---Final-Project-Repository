import { useState, useEffect } from "react";

const useCurrencyData = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      const data = await res.json();

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