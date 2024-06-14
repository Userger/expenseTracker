import { memo, useState } from "react"
import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/history.module.css"

export const HistoryItem = memo(function HistoryItem({
    id,
    category,
    num,
    descr,
}: {
    id: number
    category: string
    num: number
    descr: string
}) {
    console.log("trans", id)
    const formattedNum = Intl.NumberFormat().format(num)
    return (
        <li key={id} className={classes.historyItem} onClick={() => {}}>
            {num > 0 ? (
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
            <div className={classes.category}>{category}</div>
            <div className={classes.descr}>{descr}</div>
        </li>
    )
})
