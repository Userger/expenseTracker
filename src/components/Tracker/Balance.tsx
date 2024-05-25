import { CurrencyElement } from "./CurrencyElement"

export function Balance({ balance }: { balance: number }) {
    const formattedBalance = Intl.NumberFormat().format(balance)
    return (
        <div className="tracker-out-box">
            <h2 className="tracker-title">Balance:</h2>
            <div className="tracker-box tracker-balance">
                {formattedBalance}
                <CurrencyElement />
            </div>
        </div>
    )
}
