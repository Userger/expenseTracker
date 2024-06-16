import { useSyncExternalStore } from "react"
import { createStore } from "./store"

const modalNewTransStore = createStore(false)

export function useModalNewTrans() {
    const isOpen = useSyncExternalStore(
        modalNewTransStore.subscribe,
        modalNewTransStore.getValue
    )

    function openClose() {
        modalNewTransStore.setValue(!isOpen)
    }

    return { isOpen, openClose }
}
