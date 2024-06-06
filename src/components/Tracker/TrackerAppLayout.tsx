import { ReactNode, useEffect, useMemo, useState } from "react"
import classes from "./styles/tracker.module.css"

import { useBetterParams } from "../../hooks/useBetterParams"

const TABS = ["History"]

export function TrackerAppLayout({
    header,
    IncomeExpense,
    history,
    formTransaction,
    settings,
    Navbar,
}: {
    header: ReactNode
    IncomeExpense: ReactNode
    history: ReactNode
    formTransaction: ReactNode
    settings: ReactNode
    Navbar: React.FC<{
        tabs: string[]
        activeTab: string
        setActiveTab: ({ activeTab }: { activeTab: string }) => void
    }>
}) {
    const [isSmallWidth, setIsSmallWidth] = useState(window.innerWidth < 1200)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsSmallWidth(window.innerWidth < 1200)
        })
    }, [])
    const [params, setParams] = useBetterParams()
    const activeTab = params.get("activeTab") || "History"
    return (
        <div className={`${classes.tracker}`}>
            {settings}
            {header}
            <div className={`${classes.hContainer}`}>
                <div className={`${classes.container}`}>
                    {isSmallWidth ? (
                        <Navbar
                            tabs={TABS}
                            activeTab={activeTab}
                            setActiveTab={setParams}
                        />
                    ) : (
                        ""
                    )}
                    <div className={`${classes.content} ${classes.box}`}>
                        {history}
                    </div>
                </div>
            </div>
        </div>
    )
}
