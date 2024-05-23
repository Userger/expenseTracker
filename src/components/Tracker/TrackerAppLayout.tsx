import { ReactNode } from 'react'

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
        <div className="tracker">
            {/* {settings} */}
            {header}
            <div className="tracker-container">
                <div className="tracker-h-container">
                    {balance}
                    {IncomeExpense}
                </div>
                {history}
                {formTransaction}
            </div>
        </div>
    )
}
