import { useCurrencyParams } from "../../hooks/useCurrencyParams"
import { Currency } from "./Currency"
import classes from "./styles/currency.module.css"

export function CurrencyChoose() {
    const { nextCurrency, prevCurrency } = useCurrencyParams()
    return (
        <div className={classes.currencyChoose}>
            <button className="tracker-button" onClick={() => prevCurrency()}>
                ←
            </button>
            <Currency />
            <button className="tracker-button" onClick={() => nextCurrency()}>
                →
            </button>
        </div>
    )
}
