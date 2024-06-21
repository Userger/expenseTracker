import { Balance } from "./balance/Balance"
import { FormNewTransaction } from "./form/FormNewTransaction"
import { Header } from "./header/Header"
import { HistoryList } from "./history/HistoryList"
import { HistoryItem } from "./history/HistoryItem"
import { IncomeExpense } from "./income&expense/IncomeExpense"
import { TrackerAppLayout } from "./TrackerLayout"
import { HistoryDateContainer } from "./history/HistoryDateContainer"
import { getAnotherView } from "../../utils/historyAnotherView"
import { useMemo, useState } from "react"
import { CurrencyChoose } from "./currency/CurrensyChoose"
import { Settings } from "./settings/Settings"
import {
    TransactionType,
    getBalance,
    useTransaction,
} from "../../hooks/useTransaction"
import { Navbar } from "./navbar/Navbar"
import { PieDiagramm } from "../ui/diagrams/pie"
import { Histogramm } from "./histogramm/Histogramm"
import { HistoryItemCard } from "./hiCard/HistoryItemCard"
import { Route, Routes } from "react-router-dom"

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

    //card
    const [transactionInCard, setTransactionInCard] = useState<
        TransactionType | undefined
    >()

    return (
        <TrackerAppLayout
            // main={
            //     <Routes>
            //         <Route  />
            //     </Routes>
            // }
            settings={<Settings currencyChoose=<CurrencyChoose /> />}
            header={<Header balance={<Balance balance={balance} />} />}
            history={
                <HistoryList
                    history={
                        history.length ? (
                            anotherViewHistory.map((dateHistory) => (
                                <HistoryDateContainer
                                    key={dateHistory[0].date}
                                    date={dateHistory[0].date}
                                    balance={getBalance(dateHistory)}
                                    history={dateHistory.map((item) => (
                                        <HistoryItem
                                            active={item === transactionInCard}
                                            key={item.id}
                                            id={item.id}
                                            num={item.num}
                                            descr={item.descr}
                                            category={item.category}
                                            onClick={() => {
                                                setTransactionInCard(item)
                                            }}
                                        />
                                    ))}
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
            card={
                transactionInCard && (
                    <HistoryItemCard
                        blur={() => setTransactionInCard(undefined)}
                        transaction={transactionInCard}
                    />
                )
            }
        />
    )
}
