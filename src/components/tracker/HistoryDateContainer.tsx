import { useState } from "react"
import { TransactionType, getBalance } from "../../hooks/useTransaction"
import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/history.module.css"

export function HistoryDateContainer({
    Item,
    dateHistory,
    deleteTransaction,
}: {
    Item: React.FC<{
        id: number
        category: string
        num: number
        descr: string
        deleteTransaction: (id: number) => void
    }>
    dateHistory: TransactionType[]
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
                        id={transaction.id}
                        category={transaction.category}
                        num={transaction.num}
                        descr={transaction.descr}
                        deleteTransaction={deleteTransaction}
                        key={transaction.id}
                    />
                ))}
            </ul>
        </li>
    )
}
