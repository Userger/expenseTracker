import { ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import classes from "./index.module.css"

export function Modal({
    children,
    isOpen,
    close,
}: {
    children: ReactNode
    isOpen: boolean
    close: () => void
}) {
    const rootModal = document.getElementById("root-modal")
    useEffect(() => {
        if (rootModal && isOpen) {
            const body = document.querySelector("body")
            body?.style.setProperty("overflow", "hidden")
            return () => {
                body?.style.setProperty("overflow", "auto")
            }
        }
    }, [isOpen])
    if (rootModal && isOpen) {
        return createPortal(
            <div
                className={classes.container}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        close()
                    }
                }}
            >
                <div className={classes.box}>{children}</div>
            </div>,
            rootModal
        )
    }
}
