import { TransactionType } from "../../hooks/useExpense";

export function HistoryDateContainer({
  dateHistory,
  Item,
  deleteTransaction,
  click,
}: {
  dateHistory: TransactionType[];
  Item: React.FC<{
    transaction: TransactionType;
    deleteTransaction: (id: number) => void;
    click: (id: number) => void;
  }>;
  deleteTransaction: (id: number) => void;
  click: (id: number) => void;
}) {
  return (
    <li className="tracker-historyDateList">
      <h4>{dateHistory[0].date.dateView}</h4>
      <ul className={`tracker-historyList`}>
        {dateHistory.length ? (
          dateHistory.map((transaction) => (
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
    </li>
  );
}
