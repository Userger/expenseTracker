import { useSearchParams } from "react-router-dom"
import { currencies } from "../constants/currencies"
import { useEffect } from "react"

export function useCurrencyParams() {
    const [search, setSearch] = useSearchParams()

    let currency = search.get("currency")
    // if (!currencies.includes(currency ?? "")) {
    //     currency = currencies[0]
    // }
    useEffect(() => {
        if (!currencies.includes(currency ?? "")) {
            setSearch({ currency: currencies[0] })
        }
    }, [currency])
    const setCurrency = (value: string) => {
        if (!currencies.includes(value)) {
            setSearch({ currency: currencies[0] })
        } else {
            setSearch({ currency: value })
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
