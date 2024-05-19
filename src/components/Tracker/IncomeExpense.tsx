import { Currency } from "./Currency";

export function IncomeExpense({
  expenseSum,
  incomeSum,
}: {
  expenseSum: number;
  incomeSum: number;
}) {
  const formattedExpenseSum = Intl.NumberFormat().format(expenseSum);
  const formattedIncomeSum = Intl.NumberFormat().format(incomeSum);
  return (
    <div className="tracker-incExp-container">
      <div className="tracker-incExp-expense">
        expense = <Currency />
        {formattedExpenseSum}
      </div>
      <div className="tracker-incExp-income">
        income = <Currency />
        {formattedIncomeSum}
      </div>
    </div>
  );
}
