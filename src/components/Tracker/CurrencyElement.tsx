import { useCurrencyParams } from "../../hooks/useCurrencyParams"

export function CurrencyElement() {
    const { currency } = useCurrencyParams()
    return <span>{currency}</span>
}
