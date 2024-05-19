import { ReactNode } from "react";

export function TrackerAppLayout({
  header,
  balance,
  IncomeExpense,
  history,
  formTransaction,
  settings,
}: {
  header: ReactNode;
  balance: ReactNode;
  IncomeExpense: ReactNode;
  history: ReactNode;
  formTransaction: ReactNode;
  settings: ReactNode;
}) {
  return (
    <div className="tracker">
      {settings}
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
