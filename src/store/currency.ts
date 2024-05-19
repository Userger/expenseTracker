import { useSyncExternalStore } from "react";
import { createStore } from "./store";
import { currencies } from "../constants/currencies";

const currencyStore = createStore("$");

export function useCurrency() {
  const currency = useSyncExternalStore(
    currencyStore.subscribe,
    currencyStore.getValue,
  );
  function nextCurrency() {
    const indexCurrentCurrency = currencies.indexOf(currency);
    console.log("next");
    currencyStore.setValue(
      indexCurrentCurrency === currencies.length - 1
        ? currencies[0]
        : currencies[indexCurrentCurrency + 1],
    );
  }
  function prevCurrency() {
    const indexCurrentCurrency = currencies.indexOf(currency);
    currencyStore.setValue(
      indexCurrentCurrency === 0
        ? currencies[currencies.length - 1]
        : currencies[indexCurrentCurrency - 1],
    );
  }
  return { currency, nextCurrency, prevCurrency };
}
