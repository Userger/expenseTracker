import classes from "./header.module.css"
import { useTransaction } from "../../store/transactions"
import { CurrencyElement } from "../tracker/currency/CurrencyElement"
import { Link } from "../ui/link"

export function Header() {
    const { balance } = useTransaction()
    return (
        <div className={`${classes.header}`}>
            <div className={`${classes.logoContainer}`}>
                <img className={classes.logo} src="/expenses.png" alt="logo" />
                <h2 className={`${classes.mainTitle}`}>Tracker</h2>
            </div>
            <div className={`${classes.balanceContainer}`}>
                balance: {balance}
                <CurrencyElement />
            </div>
        </div>
    )
}
