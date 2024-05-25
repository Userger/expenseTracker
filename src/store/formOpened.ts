import { useSyncExternalStore } from 'react'
import { createStore } from './store'

const formOpenedStore = createStore(false)

export function useOpenForm() {
    const formOpened = useSyncExternalStore(
        formOpenedStore.subscribe,
        formOpenedStore.getValue
    )
    function openCloseForm() {
        formOpenedStore.setValue(!formOpened)
    }
    return { formOpened, openCloseForm }
}
