import { ReactNode } from "react"
import classes from "./styles/header.module.css"
export function Header({ balance }: { balance: ReactNode }) {
    return (
        <header className={`${classes.header}`}>
            <div className={`${classes.logoContainer}`}>
                <img className={classes.logo} src="/expenses.png" alt="logo" />
                <h2 className={`${classes.mainTitle}`}>Tracker</h2>
            </div>
            <div className={`${classes.balanceContainer}`}>{balance}</div>
        </header>
    )
}
