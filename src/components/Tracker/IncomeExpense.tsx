import { Currency } from './Currency'

export function IncomeExpense({
    expenseSum,
    incomeSum,
}: {
    expenseSum: number
    incomeSum: number
}) {
    const formattedExpenseSum = Intl.NumberFormat().format(expenseSum)
    const formattedIncomeSum = Intl.NumberFormat().format(incomeSum)
    return (
        <div className="tracker-out-box">
            <h2 className="tracker-title">income/expense:</h2>
            <div className="tracker-box tracker-incExp-container">
                <div className="tracker-incExp-income">
                    <Currency />
                    {formattedIncomeSum}
                </div>
                /
                <div className="tracker-incExp-expense">
                    <Currency />
                    {formattedExpenseSum}
                </div>
            </div>
        </div>
    )
}
