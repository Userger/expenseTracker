import { useCurrencyParams } from "../../hooks/useCurrencyParams"
// import { useCurrency } from "../../store/currency";
import { CurrencyElement } from "./CurrencyElement"

export function CurrencyChoose() {
    // const { nextCurrency, prevCurrency } = useCurrency();
    const { nextCurrency, prevCurrency } = useCurrencyParams()
    return (
        <div className="tracker-currency-choose">
            <button
                className="tracker-currency-prevButton tracker-button"
                onClick={() => prevCurrency()}
            >
                ←
            </button>
            <CurrencyElement />
            <button
                className="tracker-currency-nextButton tracker-button"
                onClick={() => nextCurrency()}
            >
                →
            </button>
        </div>
    )
}
