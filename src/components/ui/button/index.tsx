import clsx from "clsx"
import { MouseEventHandler, ReactNode } from "react"
import classes from "./index.module.css"

export function Button({
    onClick,
    children,
    variant = "border",
    disabled = false,
    type = "button",
    className,
}: {
    variant?: "border" | "bg"
    onClick: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
    disabled?: boolean
    type?: "button" | "submit"
    className?: string
}) {
    return (
        <button
            className={clsx(
                classes.button,
                variant === "bg" ? classes.bg : classes.border,
                className
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
