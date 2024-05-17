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

function reducer(
  state: TransactionsState,
  action:
    | {
        type: "add";
        payload: { type: "expense" | "income"; descr: string; num: number };
      }
    | { type: "delete" | "click"; payload: { id: number } },
) {
  switch (action.type) {
    case "add": {
      const newExpenseIncome: TransactionType = {
        id: Date.now(),
        type: action.payload.type,
        descr: action.payload.descr,
        num: action.payload.num,
        clicked: false,
      };
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
