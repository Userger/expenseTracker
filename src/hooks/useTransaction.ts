import { useCallback, useMemo, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { sortByDate } from "../model/sortByDate"

export type TransactionType = {
    id: number
    category: string
    date: string
    num: number
    descr: string
}

function getExpenseSum(transactions: TransactionType[]) {
    let income = 0
    let expense = 0
    transactions.map((exp) => {
        exp.num < 0 ? (expense += exp.num) : (income += exp.num)
    })
    return { income, expense }
}

export function getBalance(transactions: TransactionType[]) {
    const { income, expense } = getExpenseSum(transactions)
    return income + expense
}

export function getDateString(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return `${year}-${month > 8 ? month + 1 : `0${month + 1}`}-${day > 9 ? day : `0${day}`}`
}
export function getDateView(date: string) {
    // 2024-05-18
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`
    // 08.05.2024
}

const TRANSACTIONS = "transactions"
export function useTransaction() {
    const { value, setValue } = useLocalStorage<TransactionType[]>(TRANSACTIONS)
    const [transactions, setTransactions] = useState(sortByDate(value))

    const addTransaction = useCallback(
        function addTransaction(
            date: string,
            num: number,
            category: string,
            descr: string
        ) {
            setTransactions((prev) => {
                const newTransaction: TransactionType = {
                    id: Date.now(),
                    category: category,
                    date: date,
                    descr: descr,
                    num: num,
                }
                const newTransactions = sortByDate([...prev, newTransaction])
                setValue(newTransactions)
                return newTransactions
            })
        },
        [setTransactions]
    )
    const deleteTransaction = useCallback(
        function deleteTransaction(id: number) {
            setTransactions((prev) => {
                const newTransactions = sortByDate(
                    prev.filter((t) => t.id !== id)
                )
                setValue(newTransactions)
                return newTransactions
            })
        },
        [setTransactions]
    )
    const { expense, income } = useMemo(
        () => getExpenseSum(transactions),
        [transactions]
    )
    const balance = useMemo(() => expense + income, [transactions])
    return {
        transactions,
        balance,
        expense,
        income,
        addTransaction,
        deleteTransaction,
    }
}
