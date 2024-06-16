import { Balance } from "./Balance"
import { FormNewTransaction } from "./FormNewTransaction"
import { Header } from "./Header"
import { History } from "./HistoryList"
import { HistoryItem } from "./HistoryItem"
import { IncomeExpense } from "./IncomeExpense"
import { TrackerAppLayout } from "./TrackerLayout"
import "./styles/tracker.css"
import { HistoryDateContainer } from "./HistoryDateContainer"
import { getAnotherView } from "../../utils/historyAnotherView"
import { useMemo } from "react"
import { CurrencyChoose } from "./CurrensyChoose"
import { Settings } from "./Settings"
import { useTransaction } from "../../hooks/useTransaction"
import { Navbar } from "./Navbar"
import { PieDiagramm } from "../ui/diagrams/pie"
import { Histogramm } from "../ui/diagrams/histogramm"

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
            Navbar={Navbar}
            settings={<Settings currencyChoose=<CurrencyChoose /> />}
            header={<Header balance={<Balance balance={balance} />} />}
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
                            <div>empty list...</div>
                        )
                    }
                />
            }
            pie={
                <PieDiagramm
                    colors={["green", "tomato"]}
                    data={[
                        { name: "income", value: income },
                        { name: "expense", value: -expense },
                    ]}
                />
            }
            histogramm={<Histogramm history={history} />}
            formTransaction={
                <FormNewTransaction addTransaction={addTransaction} />
            }
        />
    )
}
