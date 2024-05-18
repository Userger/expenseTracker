import { useReducer } from "react";

type TransTypeCategoryState = {
  transType: "expense" | "income";
  category: string;
};

const initState: TransTypeCategoryState = {
  transType: "expense",
  category: "food",
};

function reducer(
  state: TransTypeCategoryState,
  action:
    | { type: "changeCategory"; payload: { category: string } }
    | { type: "changeType"; payload: { type: "expense" | "income" } },
) {
  switch (action.type) {
    case "changeType": {
      return {
        ...state,
        transType: action.payload.type,
        category: action.payload.type === "income" ? "salary" : "food",
      };
    }
    case "changeCategory": {
      return {
        ...state,
        category: action.payload.category,
      };
    }
    default: {
      return state;
    }
  }
}

export function useTransTypeCategory() {
  const [categoryType, dispatch] = useReducer(reducer, initState);

  function setCategory(category: string) {
    dispatch({ type: "changeCategory", payload: { category } });
  }
  function setTransType(type: "expense" | "income") {
    dispatch({ type: "changeType", payload: { type } });
  }
  return { categoryType, setCategory, setTransType };
}
