import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import classes from "./index.module.css"
import clsx from "clsx"

export function Link({
    to,
    className,
    children,
    title,
}: {
    to: string
    className?: string
    children: ReactNode
    title?: string
}) {
    return (
        <NavLink
            title={title}
            to={to}
            className={({ isActive }) =>
                clsx(isActive && classes.active, classes.link, className)
            }
        >
            {children}
        </NavLink>
    )
}
