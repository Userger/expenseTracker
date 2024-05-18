import { useExpense } from "../../hooks/useExpense";
import { useHeightFormHistory } from "../../hooks/useHeightFormHistory";
import { Balance } from "./Balance";
import { FormNewTransaction } from "./FormNewTransaction";
import { Header } from "./Header";
import { History } from "./HistoryList2";
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
          history={history}
          deleteTransaction={deleteTransaction}
          click={click}
          Item={HistoryItem}
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
