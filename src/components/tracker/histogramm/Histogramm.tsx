import { TransactionType } from "../../../hooks/useTransaction"
import classes from "./index.module.css"

export function Histogramm({ history }: { history: TransactionType[] }) {
    const max = Math.max(...history.map((e) => e.num))
    const min = Math.min(...history.map((e) => e.num))
    const maxHeight = Math.max(-min, max)

    function getHeight(num: number, max: number) {
        return `${Math.round((num / max) * 10000) / 100}%`
    }
    history.forEach((e) => console.log(getHeight(e.num, max)))
    return (
        <div className={classes.wrapper}>
            <div className={classes.metrics}>
                <div className={classes.max}>{maxHeight}</div>
                <div className={classes.zero}>0</div>
            </div>
            <div className={classes.y} />
            <div className={classes.x} />
            <div className={classes.colsContainer}>
                {history.map((e, i) => (
                    <div
                        className={classes.column}
                        key={i}
                        style={{
                            background:
                                e.num < 0
                                    ? "var(--red-color)"
                                    : "var(--green-color)",
                            height: getHeight(
                                Math.max(e.num, -e.num),
                                maxHeight
                            ),
                        }}
                    >
                        <div className={classes.num}>{e.num}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
