import { useCurrencyParams } from "../../../hooks/useCurrencyParams"
import { currencies } from "../../../constants/currencies"
import classes from "./currency.module.css"

export function CurrencyChoose() {
    const { nextCurrency, prevCurrency, currency } = useCurrencyParams()
    const _currency = currency ?? "$"
    return (
        <div className={classes.currencyChoose}>
            <button className="tracker-button" onClick={() => prevCurrency()}>
                ←
            </button>
            <div className={classes.currency}>
                <div
                    className={classes.container}
                    style={{
                        transform: `translateX(${-100 * currencies.indexOf(_currency)}%)`,
                    }}
                >
                    {currencies.map((c) => (
                        <div key={c} className={classes.currencyContainer}>
                            {c}
                        </div>
                    ))}
                </div>
            </div>
            <button className="tracker-button" onClick={() => nextCurrency()}>
                →
            </button>
        </div>
    )
}
