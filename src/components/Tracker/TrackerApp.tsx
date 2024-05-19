import { useExpense } from "../../hooks/useExpense";
import { Balance } from "./Balance";
import { FormNewTransaction } from "./FormNewTransaction";
import { Header } from "./Header";
import { History } from "./HistoryList";
import { HistoryItem } from "./HistoryItem";
import { IncomeExpense } from "./IncomeExpense";
import { TrackerAppLayout } from "./TrackerAppLayout";
import "./styles/index.css";
import { HistoryDateContainer } from "./HistoryDateContainer";
import { getAnotherView } from "../../model/historyAnotherView";
import { useMemo } from "react";
import { sortByDate } from "../../model/sortByDate";
import { CurrencyChoose } from "./CurrensyChoose";
import { Settings } from "./Settings";

export function TrackerApp() {
  const { addTransaction, deleteTransaction, click, state } = useExpense();

  const { history, balance, incomeSum, expenseSum } = state;
  const sortedHistory = useMemo(() => {
    return sortByDate(history);
  }, [history]);
  const anotherViewHistory = useMemo(() => {
    return getAnotherView(sortedHistory);
  }, [sortedHistory]);

  return (
    <TrackerAppLayout
      settings={<Settings currencyChoose=<CurrencyChoose /> />}
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
      formTransaction={<FormNewTransaction addTransaction={addTransaction} />}
    />
  );
}
