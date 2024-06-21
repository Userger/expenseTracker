import { memo } from "react"
import { CurrencyElement } from "../currency/CurrencyElement"
import classes from "./history.module.css"

export const HistoryItem = memo(function HistoryItem({
    id,
    category,
    num,
    descr,
    onClick,
    active,
}: {
    id: number
    category: string
    num: number
    descr: string
    onClick: () => void
    active: boolean
}) {
    console.log("trans", id)
    const formattedNum = Intl.NumberFormat().format(num)
    return (
        <li
            key={id}
            className={`${classes.historyItem} ${active && classes.active}`}
            onClick={onClick}
        >
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
            <div
                className={`${classes.category} 
                ${num > 0 ? classes.categoryPlus : classes.categoryMinus}`}
            >
                {category}
            </div>
            <div className={classes.descr}>{descr}</div>
        </li>
    )
})
