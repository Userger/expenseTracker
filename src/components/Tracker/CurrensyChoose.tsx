import { useCurrency } from "../../store/currency";
import { Currency } from "./Currency";

export function CurrencyChoose() {
  const { nextCurrency, prevCurrency } = useCurrency();
  return (
    <div className="tracker-currency-choose">
      <button
        className="tracker-currency-prevButton tracker-button"
        onClick={() => prevCurrency()}
      >
        ←
      </button>
      <Currency />
      <button
        className="tracker-currency-nextButton tracker-button"
        onClick={() => nextCurrency()}
      >
        →
      </button>
    </div>
  );
}
