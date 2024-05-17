import { ReactNode } from "react";

export function TrackerAppLayout({
  header,
  balance,
  IncomeExpense,
  history,
  formTransaction,
}: {
  header: ReactNode;
  balance: ReactNode;
  IncomeExpense: ReactNode;
  history: ReactNode;
  formTransaction: ReactNode;
}) {
  return (
    <div className="tracker">
      <div className="tracker-container tracker-flex">
        {header}
        <div className="tracker-h-container">
          {balance}
          {IncomeExpense}
        </div>
        {history}
      </div>
      {formTransaction}
    </div>
  );
}
