import { CurrencyElement } from "./CurrencyElement"
import classes from "./styles/incomeExpense.module.css"

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
            <div className={`tracker-box ${classes.container}`}>
                <div className={`${classes.income}`}>
                    {formattedIncomeSum}
                    <CurrencyElement />
                </div>
                /
                <div className={`${classes.expense}`}>
                    {formattedExpenseSum}
                    <CurrencyElement />
                </div>
            </div>
        </div>
    )
}
