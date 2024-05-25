import { ReactNode, useState } from "react"

export function Settings({ currencyChoose }: { currencyChoose: ReactNode }) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <div
                className={`tracker-settings ${opened ? "tracker-settings-opened" : ""}`}
            >
                <div className="tracker-settings-bar">
                    <div className={`tracker-settings-title`}>
                        <h3>Settings</h3>
                    </div>
                </div>
                <div className={`tracker-settings-field`}>
                    <div className="tracker-setting-container">
                        currency:{currencyChoose}
                    </div>
                </div>
            </div>
            <button
                className={`tracker-settings-sign`}
                onClick={() => setOpened((prev) => !prev)}
            >
                ⚙
            </button>
        </>
    )
}
