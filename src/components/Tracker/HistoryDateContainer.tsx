import { useState } from "react"
import { TransactionType, getBalance } from "../../hooks/useTransaction"
import { CurrencyElement } from "./CurrencyElement"

export function HistoryDateContainer({
    dateHistory,
    Item,
    deleteTransaction,
}: {
    dateHistory: TransactionType[]
    Item: React.FC<{
        transaction: TransactionType
        deleteTransaction: (id: number) => void
    }>
    deleteTransaction: (id: number) => void
}) {
    const [opened, setOpened] = useState(true)
    const dateHistoryBalance = getBalance(dateHistory)
    return (
        <li className="tracker-historyDateList">
            <div className="tracker-dateHistory-title">
                <h4
                    className="tracker-historyList-date"
                    onClick={() => {
                        setOpened((prev) => !prev)
                    }}
                >
                    {dateHistory[0].date}
                </h4>
                <div
                    className={`tracker-historyList-balance ${dateHistoryBalance > 0 ? "tracker-dateHistory-balance-plus" : "tracker-dateHistory-balance-minus"}
            ${opened ? "tracker-dateHistory-balance-opened" : ""}
          `}
                >
                    {dateHistoryBalance > 0 ? "+" : ""}
                    {dateHistoryBalance}
                    <CurrencyElement />
                </div>
            </div>
            <ul
                className={`tracker-historyList tracker-dateHistoryList ${opened ? "tracker-dateHistoryList-opened" : ""}`}
            >
                {dateHistory.length ? (
                    dateHistory.map((transaction) => (
                        <Item
                            deleteTransaction={deleteTransaction}
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))
                ) : (
                    <div>empty list...</div>
                )}
            </ul>
        </li>
    )
}
