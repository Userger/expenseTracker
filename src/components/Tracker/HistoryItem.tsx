import { TransactionType } from "../../hooks/useExpense";
import { memo } from "react";
import { CurrencyElement } from "./CurrencyElement";

export const HistoryItem = memo(function HistoryItem({
  transaction,
  deleteTransaction,
  click,
}: {
  transaction: TransactionType;
  deleteTransaction: (id: number) => void;
  click: (id: number) => void;
}) {
  console.log("trans", transaction.id);
  const formattedNum = Intl.NumberFormat().format(transaction.num);
  const size = {
    pad: transaction.clicked ? "0.5em" : "0em",
    width: transaction.clicked ? "5em" : "0em",
  };
  return (
    <li
      key={transaction.id}
      className={`tracker-li ${transaction.clicked ? "tracker-li-clicked" : ""}`}
    >
      <div
        className="tracker-li-h-container"
        onClick={() => {
          click(transaction.id);
        }}
      >
        <div className="tracker-li-container">
          {transaction.type === "income" ? (
            <div className={`tracker-num tracker-inc`}>
              +{formattedNum}
              <CurrencyElement />
            </div>
          ) : (
            <div className={`tracker-num tracker-exp`}>
              -{formattedNum}
              <CurrencyElement />
            </div>
          )}
          <div>{transaction.category}</div>
        </div>
        <button
          className="tracker-button tracker-delete"
          style={{ maxWidth: size.width, paddingInline: size.pad }}
          onClick={() => deleteTransaction(transaction.id)}
        >
          remove
        </button>
      </div>
      <div className="tracker-descr">{transaction.descr}</div>
    </li>
  );
});
