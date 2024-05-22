import { currencies } from "../../constants/currencies";
import { useCurrency } from "../../store/currency";

export function CurrencyElement() {
  const { currency } = useCurrency();
  return (
    <div className="tracker-currency">
      <div className="tracker-currencies-container">{currency}</div>
    </div>
  );
}
