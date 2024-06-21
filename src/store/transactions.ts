import { useLocalStorage } from "../hooks/useLocalStorage"
import { createStore } from "./store"
import { sortByDate } from "../utils/sortByDate"
import { useCallback, useMemo, useSyncExternalStore } from "react"

export type TransactionType = {
    id: number
    category: string
    date: string
    num: number
    descr: string
}
const TRANSACTIONS = "transactions"

const { value, setValue } = useLocalStorage<TransactionType[]>(TRANSACTIONS)
const transactionStore = createStore(sortByDate(value) || [])

function getExpenseSum(transactions: TransactionType[]) {
    let income = 0
    let expense = 0
    transactions.forEach((exp) => {
        exp.num < 0 ? (expense += exp.num) : (income += exp.num)
    })
    return { income, expense }
}

export function useTransaction() {
    const transactions = useSyncExternalStore(
        transactionStore.subscribe,
        transactionStore.getValue
    )

    //ADD
    const addTransaction = useCallback(function addTransaction(
        date: string,
        num: number,
        category: string,
        descr: string
    ) {
        const newTransaction: TransactionType = {
            id: Date.now(),
            category: category,
            date: date,
            descr: descr,
            num: num,
        }
        const newTransactions = sortByDate([...transactions, newTransaction])
        setValue(newTransactions)
        transactionStore.setValue(newTransactions)
    }, [])

    //DELETE
    const deleteTransaction = useCallback(function deleteTransaction(
        id: number
    ) {
        const newTransactions = sortByDate(
            transactions.filter((t) => t.id !== id)
        )
        setValue(newTransactions)
        transactionStore.setValue(newTransactions)
    }, [])

    //EXPENSE/INCOME
    const { expense, income } = useMemo(
        () => getExpenseSum(transactions),
        [transactions]
    )

    //BALANCE
    const balance = useMemo(() => expense + income, [transactions])
    return {
        history: transactions,
        balance,
        expense,
        income,
        addTransaction,
        deleteTransaction,
    }
}
