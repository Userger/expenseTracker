import { useEffect } from "react"
import { currencies } from "../constants/currencies"
import { useBetterParams } from "./useBetterParams"

export function useNotEmptyCurrency() {
    const [params, setParams] = useBetterParams()
    useEffect(() => {
        if (!currencies.includes(params.get("currency") || ""))
            setParams({ currency: currencies[0] })
    }, [])
}
