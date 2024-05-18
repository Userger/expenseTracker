import { useReducer } from "react";

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

function getBalance(history: TransactionType[]) {
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
function getDateView(date: Date) {
  const dateI = `${date.getFullYear()}-${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
  const dateView = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
  return { dateI, dateView };
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
        date: getDateView(date),
        descr: action.payload.descr,
        num: action.payload.num,
        clicked: false,
      };
      console.log(newExpenseIncome.date.dateI);
      const newHistory = [...state.history, newExpenseIncome];
      const { expSum, incSum } = getExpenseSum(newHistory);
      console.log(newHistory);
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

  function addTransaction(payload: {
    type: "expense" | "income";
    descr: string;
    num: number;
    category: string;
  }) {
    dispatch({ type: "add", payload: payload });
    console.log("addded");
  }
  function deleteTransaction(id: number) {
    dispatch({ type: "delete", payload: { id } });
  }
  function click(id: number) {
    dispatch({ type: "click", payload: { id } });
  }
  return { addTransaction, deleteTransaction, click, state };
}
