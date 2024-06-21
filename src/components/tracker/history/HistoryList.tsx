import { ReactNode, memo } from "react"
import classes from "./history.module.css"

export const HistoryList = memo(function HistoryList({
    history,
}: {
    history: ReactNode
}) {
    return (
        <div className={`${classes.history}`}>
            <ul className={`tracker-box ${classes.historyList}`}>{history}</ul>
        </div>
    )
})
