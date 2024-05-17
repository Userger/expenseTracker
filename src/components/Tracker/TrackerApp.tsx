import { useExpense } from "../../hooks/useExpense";
import { useHeightFormHistory } from "../../hooks/useHeightFormHistory";
import { Balance } from "./Balance";
import { FormNewTransaction } from "./FormNewTransaction";
import { Header } from "./Header";
import { History } from "./HistoryList";
import { HistoryItem } from "./HistoryItem";
import { IncomeExpense } from "./IncomeExpense";
import { TrackerAppLayout } from "./TrackerAppLayout";
import "./styles/index.css";

export function TrackerApp() {
  const { addTransaction, deleteTransaction, click, state } = useExpense();

  const { opened, openClose } = useHeightFormHistory();
  const { history, balance, incomeSum, expenseSum } = state;
  return (
    <TrackerAppLayout
      header={<Header />}
      balance={<Balance balance={balance} />}
      IncomeExpense={
        <IncomeExpense incomeSum={incomeSum} expenseSum={expenseSum} />
      }
      history={
        <History
          historyList={
            history.length ? (
              history.map((transaction) => (
                <HistoryItem
                  click={click}
                  deleteTransaction={deleteTransaction}
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div>empty list...</div>
            )
          }
          openClose={openClose}
        />
      }
      formTransaction={
        <FormNewTransaction
          opened={opened}
          openClose={openClose}
          addTransaction={addTransaction}
        />
      }
    />
  );
}
