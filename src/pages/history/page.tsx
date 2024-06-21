import { TransactionType, getBalance } from "../../hooks/useTransaction"
import { HistoryList } from "../../components/tracker/history/HistoryList"
import { HistoryItem } from "../../components/tracker/history/HistoryItem"
import { HistoryDateContainer } from "../../components/tracker/history/HistoryDateContainer"
import { getAnotherView } from "../../utils/historyAnotherView"
import { ReactNode, useMemo, useState } from "react"
import { useTransaction } from "../../store/transactions"
import { useNotEmptyCurrency } from "../../hooks/useNotEmptyCurrency"
import { HistoryItemCard } from "../../components/tracker/hiCard/HistoryItemCard"
import classes from "./index.module.css"
import { FormNewTransaction } from "../../components/tracker/form/FormNewTransaction"
import clsx from "clsx"
import { CloseButton } from "../../components/ui/close-button"

export function History() {
    useNotEmptyCurrency()
    const { history, addTransaction } = useTransaction()
    const anotherViewHistory = useMemo(() => {
        return getAnotherView(history)
    }, [history])
    const [transactionInCard, setTransactionInCard] = useState<
        TransactionType | undefined
    >()
    const [openedSideTab, setOpenedSideTab] = useState({
        form: true,
        card: false,
    })
    return (
        <div className={classes.container}>
            <div className={classes.leftBox}>
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
                                                setOpenedSideTab({
                                                    form: false,
                                                    card: true,
                                                })
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
            </div>
            <div className={clsx(classes.outBox)}>
                <div className={classes.box}>
                    <button
                        className={classes.sideTabButton}
                        onClick={() =>
                            setOpenedSideTab((prev) => ({
                                form: !prev.form,
                                card: prev.card ? false : prev.card,
                            }))
                        }
                    >
                        new transaction
                    </button>
                    <div
                        className={clsx(
                            classes.innerBox,
                            openedSideTab.form && classes.activeSideTab
                        )}
                    >
                        <div className="lPadding fullHeight">
                            <FormNewTransaction
                                addTransaction={addTransaction}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.box}>
                    <button
                        className={classes.sideTabButton}
                        onClick={() =>
                            setOpenedSideTab((prev) => ({
                                form: prev.form ? false : prev.form,
                                card: !prev.card,
                            }))
                        }
                    >
                        card
                    </button>
                    <div
                        className={clsx(
                            classes.innerBox,
                            openedSideTab.card && classes.activeSideTab
                        )}
                    >
                        <div className="lPadding fullHeight">
                            <HistoryItemCard transaction={transactionInCard} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
