import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import classes from "./styles/tracker.module.css"

import { useBetterParams } from "../../hooks/useBetterParams"
import { Modal } from "../ui/modal"

const TABS = ["History", "Metrics"]
const SMALL_WIDTH = 768

export function TrackerAppLayout({
    header,
    IncomeExpense,
    history,
    formTransaction,
    settings,
    pie,
    histogramm,
    Navbar,
}: {
    header: ReactNode
    IncomeExpense: ReactNode
    history: ReactNode
    formTransaction: ReactNode
    settings: ReactNode
    pie: ReactNode
    histogramm: ReactNode
    Navbar: React.FC<{
        tabs: string[]
        activeTab: string
        setActiveTab: ({ activeTab }: { activeTab: string }) => void
    }>
}) {
    const [isSmallWidth, setIsSmallWidth] = useState(
        window.innerWidth < SMALL_WIDTH
    )
    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsSmallWidth(window.innerWidth <= SMALL_WIDTH)
        })
    }, [])
    const [params, setParams] = useBetterParams()
    const activeTab = params.get("activeTab") || "History"
    const [formOpened, setFormOpened] = useState(false)
    const closeForm = useCallback(() => {
        setFormOpened(false)
    }, [setFormOpened])
    return (
        <div className={`${classes.tracker}`}>
            {settings}
            {header}
            <Modal isOpen={formOpened} close={closeForm}>
                {formTransaction}
            </Modal>
            <div className={`${classes.hContainer}`}>
                <div className={classes.navContainer}>
                    {isSmallWidth ? (
                        <Navbar
                            tabs={TABS}
                            activeTab={activeTab}
                            setActiveTab={setParams}
                        />
                    ) : null}
                    <button
                        onClick={() => setFormOpened(true)}
                        className={classes.addButton}
                    >
                        + transaction
                    </button>
                </div>
                <div className={`${classes.container}`}>
                    <div
                        className={`${classes.box} ${classes.historyBox} ${activeTab === "History" || !isSmallWidth ? classes.activeBox : ""}`}
                    >
                        {history}
                    </div>
                    <div
                        className={`${classes.box} ${activeTab === "Metrics" || !isSmallWidth ? classes.activeBox : ""}`}
                    >
                        {pie}
                        {histogramm}
                    </div>
                </div>
            </div>
        </div>
    )
}
