import { currencies } from "../constants/currencies"
import { useEffect } from "react"
import { useBetterParams } from "./useBetterParams"

export function useCurrencyParams() {
    const [params, setParams] = useBetterParams()
    let currency = params.get("currency")

    useEffect(() => {
        if (!currencies.includes(currency ?? "")) {
            setParams({ currency: currencies[0] })
        }
    }, [params])
    const setCurrency = (value: string) => {
        if (!currencies.includes(value)) {
            setParams({ currency: currencies[0] })
        } else {
            setParams({ currency: value })
        }
    }
    function nextCurrency() {
        if (currency) {
            const indexCurrentCurrency = currencies.indexOf(currency)
            setCurrency(
                indexCurrentCurrency === currencies.length - 1
                    ? currencies[0]
                    : currencies[indexCurrentCurrency + 1]
            )
        }
    }
    function prevCurrency() {
        if (currency) {
            const indexCurrentCurrency = currencies.indexOf(currency)
            setCurrency(
                indexCurrentCurrency === 0
                    ? currencies[currencies.length - 1]
                    : currencies[indexCurrentCurrency - 1]
            )
        }
    }
    return { currency, setCurrency, nextCurrency, prevCurrency }
}
