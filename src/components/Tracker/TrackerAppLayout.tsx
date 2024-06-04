import { ReactNode, useEffect, useMemo, useState } from "react"
import classes from "./styles/tracker.module.css"
import { useSearchParams } from "react-router-dom"
import { decodeSearchParams } from "../../utils/decodeSearchParams"
import { useBetterParams } from "../../hooks/useBetterParams"

export function TrackerAppLayout({
    header,
    balance,
    IncomeExpense,
    history,
    formTransaction,
    settings,
    Navbar,
}: {
    header: ReactNode
    balance: ReactNode
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
    const [width, setWidth] = useState(window.innerWidth || 0)
    const isSmallWidth = useMemo(() => width <= 1440, [width])
    const tabs = useMemo(
        () => (isSmallWidth ? ["History", "New transaction"] : ["History"]),
        [isSmallWidth]
    )
    const [params, setParams] = useBetterParams()
    const activeTab = params.get("activeTab")

    useEffect(() => {
        if (!tabs.includes(activeTab ?? "")) {
            setParams({ activeTab: tabs[0] })
        }
    }, [tabs])
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth || 0)
        })
    }, [])
    return (
        <div className={`${classes.tracker}`}>
            {settings}
            {header}
            <div className={`${classes.hContainer}`}>
                <div className={`${classes.container}`}>
                    {balance}
                    <div className={`${classes.content}`}>
                        <Navbar
                            tabs={tabs}
                            activeTab={activeTab ?? "History"}
                            setActiveTab={setParams}
                        />
                        {activeTab === "History" ? history : null}
                        {isSmallWidth && activeTab === "New transaction"
                            ? formTransaction
                            : null}
                    </div>
                </div>
                {isSmallWidth ? null : formTransaction}
            </div>
        </div>
    )
}
