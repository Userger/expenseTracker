import { TransactionType } from "../hooks/useTransaction"

export function getAnotherView(history: TransactionType[]) {
    const newHistory: TransactionType[][] = []
    let a = 0
    for (let i = 0; i < history.length; i++) {
        if (!newHistory[a]) {
            newHistory[a] = []
        }
        if (
            newHistory[a][0]?.date === history[i].date ||
            !newHistory[a].length
        ) {
            newHistory[a]?.push(history[i])
        } else {
            a++
            newHistory[a] = []
            newHistory[a]?.push(history[i])
        }
    }
    return newHistory
}
