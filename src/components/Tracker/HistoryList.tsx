import { ReactNode, memo } from "react"
import classes from "./styles/history.module.css"

export const History = memo(function History({
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
