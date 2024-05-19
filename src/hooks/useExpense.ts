import { useCallback, useReducer } from "react";

type TransactionsState = {
  balance: number;
  history: TransactionType[];
  expenseSum: number;
  incomeSum: number;
};
export type TransactionType = {
  id: number;
  type: "expense" | "income";
  category: string;
  date: { dateI: string; dateView: string };
  num: number;
  descr: string;
  clicked: boolean;
};

export function getBalance(history: TransactionType[]) {
  return history.reduce((sum, exp) => {
    return exp.type === "expense" ? sum - exp.num : sum + exp.num;
  }, 0);
}

function getExpenseSum(history: TransactionType[]) {
  let incSum = 0;
  let expSum = 0;
  history.map((exp) => {
    exp.type === "expense" ? (expSum += exp.num) : (incSum += exp.num);
  });

  return { incSum, expSum };
}
export function getDateView2(date: Date) {
  const dateI = `${date.getFullYear()}-${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
  const dateView = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
  return { dateI, dateView };
}
function getDateView(date: string) {
  // 2024-05-18
   return `${date.slice(8, 10)}.${date.slice(5,7)}.${date.slice(0,4)}`
  // 08.05.2024
}
function reducer(
  state: TransactionsState,
  action:
    | {
        type: "add";
        payload: {
          type: "expense" | "income";
          descr: string;
          num: number;
          category: string;
          date: string
        };
      }
    | { type: "delete" | "click"; payload: { id: number } },
) {
  switch (action.type) {
    case "add": {
      const date = new Date();
      const newExpenseIncome: TransactionType = {
        id: date.getSeconds(),
        type: action.payload.type,
        category: action.payload.category,
        date: {
          dateI: action.payload.date,
          dateView: getDateView(action.payload.date)
        },
        descr: action.payload.descr,
        num: action.payload.num,
        clicked: false,
      };
      const newHistory = [...state.history, newExpenseIncome];
      const { expSum, incSum } = getExpenseSum(newHistory);
      return {
        ...state,
        balance: getBalance(newHistory),
        history: newHistory,
        incomeSum: incSum,
        expenseSum: expSum,
      };
    }
    case "delete": {
      const newHistory = state.history.filter(
        (trans) => trans.id !== action.payload.id,
      );
      const { expSum, incSum } = getExpenseSum(newHistory);
      return {
        ...state,
        balance: getBalance(newHistory),
        history: newHistory,
        incomeSum: incSum,
        expenseSum: expSum,
      };
    }
    case "click": {
      return {
        ...state,
        history: state.history.map((t) =>
          t.id === action.payload.id
            ? { ...t, clicked: !t.clicked }
            : { ...t, clicked: false },
        ),
      };
    }
    default: {
      return state;
    }
  }
}
const initState: TransactionsState = {
  balance: 0,
  history: [],
  incomeSum: 0,
  expenseSum: 0,
};
export function useExpense() {
  const [state, dispatch] = useReducer(reducer, initState);

  const addTransaction = useCallback(function addTransaction(payload: {
    type: "expense" | "income";
    descr: string;
    num: number;
    category: string;
    date: string
  }) {
    dispatch({ type: "add", payload: payload });
  }, [dispatch])

  const deleteTransaction = useCallback(function deleteTransaction(id: number) {
    dispatch({ type: "delete", payload: { id } });
  }, [dispatch])

  const click = useCallback(function click(id: number) {
    dispatch({ type: "click", payload: { id } });
  }, [dispatch])

  return { addTransaction, deleteTransaction, click, state };
}
