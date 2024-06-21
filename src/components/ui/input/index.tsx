import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react"
import { DownArrow } from "../../icons/DownArrow"
import classes from "./index.module.css"

export function Input({
    type,
    value,
    onChange,
    select,
}: {
    type: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    select?: ReactNode
}) {
    return (
        <div className={`${classes.hContainer} ${value ? classes.active : ""}`}>
            <input
                autoComplete="off"
                className={`${classes.input}`}
                type="text"
                value={value}
                onChange={onChange}
            />
            <div className={`${classes.placeholder}`}>{type}</div>
            {select}
        </div>
    )
}

Input.select = function ({
    options,
    setOption,
}: {
    options: string[]
    setOption: (opt: string) => void
}) {
    const [opened, setOpened] = useState(false)
    const ref = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const { target } = e
            if (
                target instanceof Node &&
                ref.current !== target &&
                !ref.current?.contains(target) &&
                opened
            ) {
                setOpened(false)
            }
        }
        window.addEventListener("click", handleClick)

        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [opened])

    return (
        <>
            <button
                onClick={() =>
                    setOpened((p) => {
                        return !p
                    })
                }
                ref={ref}
                type="button"
                className={classes.selectButton}
            >
                <DownArrow />
            </button>
            <div
                className={`${classes.select} ${opened ? classes.opened : ""}`}
            >
                {options.map((o) => (
                    <div
                        onClick={() => setOption(o)}
                        className={classes.option}
                        key={o}
                    >
                        {o}
                    </div>
                ))}
            </div>
        </>
    )
}
