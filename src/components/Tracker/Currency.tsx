import { currencies } from "../../constants/currencies"
import classes from "./styles/currency.module.css"

export function Currency({ currency }: { currency: string | null }) {
    const _currency = currency ?? "$"
    return (
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
    )
}
