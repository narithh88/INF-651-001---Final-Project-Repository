import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // load from localStorage first
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // save whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (code) => {
    setFavorites((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code]
    );
  };

  return (
    <CurrencyContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </CurrencyContext.Provider>
  );
}