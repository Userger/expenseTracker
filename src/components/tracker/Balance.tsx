import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/balance.module.css"

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
