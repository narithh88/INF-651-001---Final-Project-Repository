// simple flag list 
const currencyFlags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CNY: "🇨🇳",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  CHF: "🇨🇭",
  SGD: "🇸🇬",
  HKD: "🇭🇰",
  KRW: "🇰🇷",
  INR: "🇮🇳",
  THB: "🇹🇭",
  MYR: "🇲🇾",
  IDR: "🇮🇩",
  VND: "🇻🇳",
  PHP: "🇵🇭",
  AED: "🇦🇪",
  SAR: "🇸🇦",
  ZAR: "🇿🇦",
  KHR: "🇰🇭"
};

// fallback in case flag not found
const getFlag = (code) => {
  if (currencyFlags[code]) return currencyFlags[code];

  // generate flag from first 2 letters
  const country = code.slice(0, 2).toUpperCase();
  return country.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt())
  );
};

function CurrencySelector({ value, onChange, options }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((currency) => (
        <option key={currency} value={currency}>
          {getFlag(currency)} {currency}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelector;