import { ReactNode, memo } from 'react'

export const History = memo(function History({
    history,
}: {
    history: ReactNode
}) {
    return (
        <div className="tracker-out-box tracker-history">
            <h3 className="tracker-title">History:</h3>
            <ul className="tracker-box tracker-historyList">{history}</ul>
        </div>
    )
})
