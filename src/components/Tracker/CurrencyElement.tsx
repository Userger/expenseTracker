import { useCurrencyParams } from "../../hooks/useCurrencyParams"
// import { useCurrency } from "../../store/currency"

export function CurrencyElement() {
    // const { currency } = useCurrency()
    const { currency } = useCurrencyParams()
    return (
        <div className="tracker-currency">
            <div className="tracker-currencies-container">{currency}</div>
        </div>
    )
}
