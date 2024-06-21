import { ReactNode, useState } from "react"
import { TransactionType, getBalance } from "../../../hooks/useTransaction"
import { CurrencyElement } from "../currency/CurrencyElement"
import classes from "./history.module.css"

export function HistoryDateContainer({
    date,
    history,
    balance,
}: {
    date: string
    history: ReactNode
    balance: number
}) {
    const [opened, setOpened] = useState(true)
    return (
        <li>
            <div className={`${classes.dateTitle}`}>
                <h4
                    className={`${classes.date}`}
                    onClick={() => {
                        setOpened((prev) => !prev)
                    }}
                >
                    {date}
                </h4>
                <div
                    className={`${classes.dateBalance} ${balance > 0 ? classes.dateBalancePlus : classes.dateBalanceMinus}
            ${opened ? classes.dateBalanceOpened : ""}
          `}
                >
                    {balance > 0 ? "+" : ""}
                    {balance}
                    <CurrencyElement />
                </div>
            </div>
            <ul
                className={`${classes.historyList} ${classes.dateHistoryList} ${opened ? classes.dateHistoryListOpened : ""}`}
            >
                {history}
            </ul>
        </li>
    )
}
