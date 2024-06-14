import { ReactNode, useState } from "react"
import classes from "./styles/settings.module.css"

export function Settings({ currencyChoose }: { currencyChoose: ReactNode }) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <div
                className={`${classes.settings} ${opened ? classes.settingsOpened : ""}`}
            >
                <div className={`${classes.bar}`}>
                    <div className={`${classes.title}`}>
                        <h3>Settings</h3>
                    </div>
                </div>
                <div className={`${classes.field}`}>
                    <div className={`${classes.container}`}>
                        currency:{currencyChoose}
                    </div>
                </div>
            </div>
            <button
                className={`${classes.sign}`}
                onClick={() => setOpened((prev) => !prev)}
            >
                ⚙
            </button>
        </>
    )
}
