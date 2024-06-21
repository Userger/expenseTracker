import { TransactionType } from "../../../store/transactions"
import { CurrencyElement } from "../currency/CurrencyElement"
import classes from "./greatest.module.css"

export function GreatestTransactions({
    history,
}: {
    history: TransactionType[]
}) {
    const max = Math.max(...history.map((e) => e.num))
    const min = -Math.min(...history.map((e) => e.num))
    return (
        <div className={classes.container}>
            <div className={classes.minMaxContainer}>
                <div
                    className={classes.min}
                    style={{
                        width: `${(min > max ? 1 : min / max) * 100}% `,
                    }}
                />
                <div
                    className={classes.max}
                    style={{
                        width: `${(min > max ? max / min : 1) * 100}% `,
                    }}
                />
            </div>
            {max > min ? (
                <p>
                    Your biggest expense greater than biggest income by{" "}
                    {min - max}
                    <CurrencyElement />
                </p>
            ) : (
                <p>
                    Your biggest income greater than biggest expense by{" "}
                    {max - min}
                    <CurrencyElement />
                </p>
            )}
        </div>
    )
}
