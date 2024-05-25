import { Balance } from "./Balance"
import { FormNewTransaction } from "./FormNewTransaction"
import { Header } from "./Header"
import { History } from "./HistoryList"
import { HistoryItem } from "./HistoryItem"
import { IncomeExpense } from "./IncomeExpense"
import { TrackerAppLayout } from "./TrackerAppLayout"
import "./styles/index.css"
import { HistoryDateContainer } from "./HistoryDateContainer"
import { getAnotherView } from "../../model/historyAnotherView"
import { useMemo } from "react"
import { CurrencyChoose } from "./CurrensyChoose"
import { Settings } from "./Settings"
import { EmptyList } from "./EmptyList"
import { useTransaction } from "../../hooks/useTransaction"

export function TrackerApp() {
    const {
        transactions: history,
        addTransaction,
        deleteTransaction,
        balance,
        income,
        expense,
    } = useTransaction()
    const anotherViewHistory = useMemo(() => {
        return getAnotherView(history)
    }, [history])

    return (
        <TrackerAppLayout
            settings={<Settings currencyChoose=<CurrencyChoose /> />}
            header={<Header />}
            balance={<Balance balance={balance} />}
            IncomeExpense={
                <IncomeExpense incomeSum={income} expenseSum={expense} />
            }
            history={
                <History
                    history={
                        history.length ? (
                            anotherViewHistory.map((dateHistory) => (
                                <HistoryDateContainer
                                    deleteTransaction={deleteTransaction}
                                    Item={HistoryItem}
                                    key={dateHistory[0].date}
                                    dateHistory={dateHistory}
                                />
                            ))
                        ) : (
                            <EmptyList />
                        )
                    }
                />
            }
            formTransaction={
                <FormNewTransaction addTransaction={addTransaction} />
            }
        />
    )
}
