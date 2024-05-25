import { TransactionType } from "../hooks/useTransaction"

function compareDate(firstItem: TransactionType, secItem: TransactionType) {
    const firstItemDate = {
        year: Number(firstItem.date.slice(0, 4)),
        month: Number(firstItem.date.slice(5, 7)),
        day: Number(firstItem.date.slice(8, 10)),
    }
    const secItemDate = {
        year: Number(secItem.date.slice(0, 4)),
        month: Number(secItem.date.slice(5, 7)),
        day: Number(secItem.date.slice(8, 10)),
    }
    if (firstItemDate.year > secItemDate.year) {
        return 1
    } else if (firstItemDate.year < secItemDate.year) {
        return -1
    } else {
        if (firstItemDate.month > secItemDate.month) {
            return 1
        } else if (firstItemDate.month < secItemDate.month) {
            return -1
        } else {
            if (firstItemDate.day > secItemDate.day) {
                return 1
            } else {
                return -1
            }
        }
    }
}
export function sortByDate(history: TransactionType[]) {
    return history.sort(compareDate)
}
