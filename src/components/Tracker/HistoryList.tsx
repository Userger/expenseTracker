import { ReactNode, memo } from "react"
import classes from "./styles/history.module.css"

export const History = memo(function History({
    history,
}: {
    history: ReactNode
}) {
    return (
        <div className={`tracker-out-box ${classes.history}`}>
            <h3 className={`tracker-title ${classes.title}`}>History:</h3>
            <ul className={`tracker-box ${classes.historyList}`}>{history}</ul>
        </div>
    )
})
