import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/balance.module.css"

export function Balance({ balance }: { balance: number }) {
    const formattedBalance = Intl.NumberFormat().format(balance)
    return (
        <div className="tracker-out-box">
            <h2 className="tracker-title">Balance:</h2>
            <div className={`tracker-box ${classes.balance}`}>
                {formattedBalance}
                <CurrencyElement />
            </div>
        </div>
    )
}
