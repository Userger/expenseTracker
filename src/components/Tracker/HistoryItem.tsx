import { TransactionType } from "../../hooks/useTransaction"
import { memo, useState } from "react"
import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/history.module.css"

export const HistoryItem = memo(function HistoryItem({
    transaction,
    deleteTransaction,
}: {
    transaction: TransactionType
    deleteTransaction: (id: number) => void
}) {
    const [opened, setOpened] = useState(false)
    console.log("trans", transaction.id)
    const formattedNum = Intl.NumberFormat().format(transaction.num)
    return (
        <li
            key={transaction.id}
            className={`${classes.historyItem} ${opened ? classes.historyItemOpened : ""}`}
        >
            <div
                className={classes.historyItemHContainer}
                onClick={() => {
                    setOpened((prev) => !prev)
                }}
            >
                <div className={classes.historyItemContainer}>
                    {transaction.num > 0 ? (
                        <div className={`${classes.num} ${classes.inc}`}>
                            +{formattedNum}
                            <CurrencyElement />
                        </div>
                    ) : (
                        <div className={`${classes.num} ${classes.exp}`}>
                            {formattedNum}
                            <CurrencyElement />
                        </div>
                    )}
                    <div className={classes.category}>
                        {transaction.category}
                    </div>
                </div>
                <button
                    className={`tracker-button ${classes.deleteButton} ${opened ? classes.deleteButtonShow : ""}`}
                    onClick={() => deleteTransaction(transaction.id)}
                >
                    remove
                </button>
            </div>
            <div className={classes.descr}>{transaction.descr}</div>
        </li>
    )
})
