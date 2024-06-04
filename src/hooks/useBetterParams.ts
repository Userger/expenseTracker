import { useSearchParams } from "react-router-dom"
import { decodeSearchParams } from "../utils/decodeSearchParams"

export function useBetterParams() {
    const [params, setSearch] = useSearchParams()
    function setParams(p: { [key: string]: string }) {
        setSearch((prev) => ({
            ...decodeSearchParams(prev),
            ...p,
        }))
    }
    function resetParams(p: { [key: string]: string }) {
        setSearch(p)
    }
    return [params, setParams, resetParams] as [
        URLSearchParams,
        typeof setParams,
        typeof resetParams,
    ]
}
