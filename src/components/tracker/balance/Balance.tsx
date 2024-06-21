import { CurrencyElement } from "../currency/CurrencyElement"
import classes from "./balance.module.css"

export function Balance({ balance }: { balance: number }) {
    const formattedBalance = Intl.NumberFormat().format(balance)
    return (
        <p className={`${classes.container}`}>
            <span className={`${classes.title}`}>Balance: </span>{" "}
            <span className={`${classes.balance}`}>
                {formattedBalance}
                <CurrencyElement />
            </span>
        </p>
    )
}
