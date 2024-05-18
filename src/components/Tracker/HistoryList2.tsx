import { memo, useMemo } from "react";
import { TransactionType } from "./../../hooks/useExpense";

export const History = memo(function History({
  history,
  Item,
  click,
  deleteTransaction,
}: {
  history: TransactionType[];
  Item: React.FC<{
    transaction: TransactionType;
    deleteTransaction: (id: number) => void;
    click: (id: number) => void;
  }>;
  deleteTransaction: (id: number) => void;
  click: (id: number) => void;
}) {
  function getAnotherView(history: TransactionType[]) {
    const newHistory: TransactionType[][] = [];
    let a = 0;
    for (let i = 0; i < history.length; i++) {
      if (newHistory[a][0]?.date.dateView === history[i].date.dateView) {
        newHistory[a].push(history[i]);
      } else {
        a++;
        newHistory[a].push(history[i]);
      }
    }
    return newHistory;
  }
  return (
    <div className="tracker-history-container">
      <h3>History</h3>
      <ul className={`tracker-historyList`}>
        {history.length ? (
          history.map((transaction) => (
            <Item
              click={click}
              deleteTransaction={deleteTransaction}
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <div>empty list...</div>
        )}
      </ul>
      {/* <ul className="tracker-historyList">{}</ul> */}
    </div>
  );
});
