import { Currency } from './Currency'

export function Balance({ balance }: { balance: number }) {
    const formattedBalance = Intl.NumberFormat().format(balance)
    return (
        <div className="tracker-out-box">
            <h2 className="tracker-title">Balance:</h2>
            <div className="tracker-box tracker-balance">
                <Currency />
                {formattedBalance}
            </div>
        </div>
    )
}
