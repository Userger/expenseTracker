import { ReactNode } from "react"
import classes from "./styles/tracker.module.css"

export function TrackerAppLayout({
    header,
    balance,
    IncomeExpense,
    history,
    formTransaction,
    settings,
}: {
    header: ReactNode
    balance: ReactNode
    IncomeExpense: ReactNode
    history: ReactNode
    formTransaction: ReactNode
    settings: ReactNode
}) {
    return (
        <div className={`${classes.tracker}`}>
            {settings}
            {header}
            <div className={`${classes.container}`}>
                <div className={`${classes.hContainer}`}>
                    {balance}
                    {IncomeExpense}
                </div>
                {history}
                {formTransaction}
            </div>
        </div>
    )
}
