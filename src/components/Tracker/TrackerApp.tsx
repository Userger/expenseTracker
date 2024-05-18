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
import { HistoryDateContainer } from "./HistoryDateContainer";
import { getAnotherView } from "../../model/historyAnotherView";
import { useMemo } from "react";

export function TrackerApp() {
  const { addTransaction, deleteTransaction, click, state } = useExpense();

  const { opened, openClose } = useHeightFormHistory();
  const { history, balance, incomeSum, expenseSum } = state;
  const anotherViewHistory = useMemo(() => {
    return getAnotherView(history);
  }, [history]);
  return (
    <TrackerAppLayout
      header={<Header />}
      balance={<Balance balance={balance} />}
      IncomeExpense={
        <IncomeExpense incomeSum={incomeSum} expenseSum={expenseSum} />
      }
      history={
        <History
          history={
            history.length ? (
              anotherViewHistory.map((dateHistory) => (
                <HistoryDateContainer
                  deleteTransaction={deleteTransaction}
                  click={click}
                  Item={HistoryItem}
                  key={dateHistory[0].date.dateView}
                  dateHistory={dateHistory}
                />
              ))
            ) : (
              <div>empty list...</div>
            )
          }
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
