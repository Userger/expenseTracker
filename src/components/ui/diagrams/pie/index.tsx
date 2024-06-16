import { useEffect, useRef } from "react"
import { getColorByIndex } from "../../../../utils/getColor"
import classes from "./index.module.css"

type Data = {
    name: string
    value: number
}[]

export function PieDiagramm({
    colors = [],
    data,
}: {
    colors?: string[]
    data: Data
}) {
    const { conic, rootRef, blurColor, focusColor } = usePieDiagramm(
        data,
        colors
    )
    return (
        <div ref={rootRef} style={{ padding: "var(--tracker-l-space)" }}>
            <div
                style={{
                    background: conic,
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                    marginBottom: "16px",
                    boxShadow: "0 0 4px 1px var(--light-color)",
                }}
            />
            <ul className={classes.ul}>
                {data.map((e, i) => (
                    <li
                        key={i}
                        onMouseEnter={() => {
                            focusColor(i)
                        }}
                        onMouseLeave={() => {
                            blurColor(i)
                        }}
                    >
                        {e.name}
                        <div
                            className={classes.before}
                            style={{ backgroundColor: `var(--color${i})` }}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function getConicGradient(data: Data) {
    let d = 0
    let s: string = ""
    const sum = data.reduce((sum, i) => sum + i.value, 0)
    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            s += `var(--color${i}) 0`
        } else {
            const deg = Math.round((data[i].value / sum) * 360)
            d += deg
            s += `var(--color${i}) 0 ${d}deg, `
        }
    }
    return `conic-gradient(${s})`
}

function usePieDiagramm(data: Data, colors: string[]) {
    const rootRef = useRef<HTMLDivElement>(null)

    const _colors = data.map((_, i) => {
        return colors[i] ?? getColorByIndex(i)
    })

    const conic = getConicGradient(data)

    useEffect(() => {
        _colors.forEach((_, i) => {
            rootRef.current?.style.setProperty(`--color${i}`, _colors[i])
        })
    }, [])

    function focusColor(i: number) {
        _colors.forEach((_, index) => {
            if (i !== index) {
                rootRef.current?.style.setProperty(
                    `--color${index}`,
                    "var(--light-color2)"
                )
            }
        })
    }
    function blurColor(i: number) {
        _colors.forEach((_, index) => {
            if (i !== index) {
                rootRef.current?.style.setProperty(
                    `--color${index}`,
                    _colors[index]
                )
            }
        })
    }

    return { rootRef, focusColor, blurColor, conic }
}
