import clsx from "clsx"
import classes from "./index.module.css"

export function CloseButton({
    onClick,
    className,
}: {
    onClick: () => void
    className?: string
}) {
    return (
        <button className={clsx(classes.button, className)} onClick={onClick}>
            <div>&times;</div>
        </button>
    )
}
