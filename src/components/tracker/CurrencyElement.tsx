import { useSearchParams } from "react-router-dom"

export function CurrencyElement() {
    const [search] = useSearchParams()
    let currency = search.get("currency")
    return <span>{currency}</span>
}
