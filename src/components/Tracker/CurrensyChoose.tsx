import { useCurrencyParams } from "../../hooks/useCurrencyParams"
import { Currency } from "./Currency"
import classes from "./styles/currency.module.css"

export function CurrencyChoose() {
    const { nextCurrency, prevCurrency, currency } = useCurrencyParams()
    return (
        <div className={classes.currencyChoose}>
            <button className="tracker-button" onClick={() => prevCurrency()}>
                ←
            </button>
            <Currency currency={currency} />
            <button className="tracker-button" onClick={() => nextCurrency()}>
                →
            </button>
        </div>
    )
}
