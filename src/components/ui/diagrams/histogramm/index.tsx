import { TransactionType } from "../../../../hooks/useTransaction"
import classes from "./index.module.css"

export function Histogramm({ history }: { history: TransactionType[] }) {
    const max = Math.max(...history.map((e) => e.num))
    const min = Math.min(...history.map((e) => e.num))
    const maxHeight = Math.max(-min, max)
    const minHeight = Math.min(-min, max)
    const sign = -min > max ? -1 : 1
    const percent =
        (100 - Math.round((minHeight / maxHeight) * 10000) / 100) / 2

    function getHeight(num: number, max: number) {
        return `${Math.round((num / max) * 10000) / 100}%`
    }
    history.forEach((e) => console.log(getHeight(e.num, max)))
    return (
        <div
            style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                position: "relative",
                border: "1px solid var(--accent-color)",
                padding: "var(--tracker-m-space)",
            }}
        >
            <div className={classes.metrics}>
                <div className={classes.max}>{max}</div>
                <div
                    style={{
                        position: "absolute",
                        top: `${sign < 0 ? 50 - percent / 2 : 50 + percent / 2}%`,
                        transform: "translateY(-100%)",
                    }}
                >
                    0
                </div>
                <div className={classes.min}>{min}</div>
            </div>
            <div className={classes.y} />
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    height: `${(50 * (100 + percent)) / 100}%`,
                    transform: `translateY(${sign * percent}%)`,
                    width: "300px",
                }}
            >
                <div className={classes.x} />
                {history.map((e) => (
                    <div
                        className={classes.column}
                        key={e.id}
                        style={{
                            transform: `translateY(${e.num > 0 ? "-" : "+"}50%)`,
                            background: e.num < 0 ? "tomato" : "green",
                            height: getHeight(
                                Math.max(e.num, -e.num),
                                maxHeight
                            ),
                            maxWidth: "20px",
                            width: "100%",
                            boxShadow: "0 0 4px 1px var(--light-color)",
                        }}
                    >
                        <div className={classes.num}>{e.num}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
