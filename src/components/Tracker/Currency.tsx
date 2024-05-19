import { currencies } from "../../constants/currencies";
import { useCurrency } from "../../store/currency";

export function Currency() {
  const { currency } = useCurrency();
  return (
    <div className="tracker-currency">
      <div
        className="tracker-currencies-container"
        style={{
          transform: `translateX(${-100 * currencies.indexOf(currency)}%)`,
        }}
      >
        {currencies.map((c) => (
          <div className="tracker-currency-container">{c}</div>
        ))}
      </div>
    </div>
  );
}
