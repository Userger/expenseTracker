import { TransactionType } from "../../hooks/useTransaction"
import { memo, useState } from "react"
import { CurrencyElement } from "./CurrencyElement"

export const HistoryItem = memo(function HistoryItem({
    transaction,
    deleteTransaction,
}: {
    transaction: TransactionType
    deleteTransaction: (id: number) => void
}) {
    const [clicked, click] = useState(false)
    console.log("trans", transaction.id)
    const formattedNum = Intl.NumberFormat().format(transaction.num)
    const size = {
        pad: clicked ? "0.5em" : "0em",
        width: clicked ? "5em" : "0em",
    }
    return (
        <li
            key={transaction.id}
            className={`tracker-li ${clicked ? "tracker-li-clicked" : ""}`}
        >
            <div
                className="tracker-li-h-container"
                onClick={() => {
                    click((prev) => !prev)
                }}
            >
                <div className="tracker-li-container">
                    {transaction.num > 0 ? (
                        <div className={`tracker-num tracker-inc`}>
                            +{formattedNum}
                            <CurrencyElement />
                        </div>
                    ) : (
                        <div className={`tracker-num tracker-exp`}>
                            {formattedNum}
                            <CurrencyElement />
                        </div>
                    )}
                    <div className="tracker-hi-category">
                        {transaction.category}
                    </div>
                </div>
                <button
                    className="tracker-button tracker-delete"
                    style={{ maxWidth: size.width, paddingInline: size.pad }}
                    onClick={() => deleteTransaction(transaction.id)}
                >
                    remove
                </button>
            </div>
            <div className="tracker-descr">{transaction.descr}</div>
        </li>
    )
})
