import { useState } from "react"
import { TransactionType, getBalance } from "../../hooks/useTransaction"
import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/history.module.css"

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
    const dateBalance = getBalance(dateHistory)
    return (
        <li>
            <div className={`${classes.dateTitle}`}>
                <h4
                    className={`${classes.date}`}
                    onClick={() => {
                        setOpened((prev) => !prev)
                    }}
                >
                    {dateHistory[0].date}
                </h4>
                <div
                    className={`${classes.dateBalance} ${dateBalance > 0 ? classes.dateBalancePlus : classes.dateBalanceMinus}
            ${opened ? classes.dateBalanceOpened : ""}
          `}
                >
                    {dateBalance > 0 ? "+" : ""}
                    {dateBalance}
                    <CurrencyElement />
                </div>
            </div>
            <ul
                className={`${classes.historyList} ${classes.dateHistoryList} ${opened ? classes.dateHistoryListOpened : ""}`}
            >
                {dateHistory.map((transaction) => (
                    <Item
                        deleteTransaction={deleteTransaction}
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </li>
    )
}
