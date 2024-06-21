import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import classes from "./tracker.module.css"
import "./tracker.css"

import { useBetterParams } from "../../hooks/useBetterParams"
import { Modal } from "../ui/modal"
import clsx from "clsx"
import { Navbar } from "./navbar/Navbar"

const TABS = ["History", "Metrics"]

export function TrackerAppLayout({
    header,
    history,
    formTransaction,
    card,
    settings,
    pie,
    histogramm,
}: {
    header: ReactNode
    history: ReactNode
    formTransaction: ReactNode
    card?: ReactNode
    settings: ReactNode
    pie: ReactNode
    histogramm: ReactNode
}) {
    const [params, setParams] = useBetterParams()
    const activeTab = params.get("activeTab") || "History"
    const [formOpened, setFormOpened] = useState(false)
    return (
        <div className={`${classes.tracker}`}>
            {header}
            <Modal isOpen={formOpened} close={() => setFormOpened(false)}>
                {formTransaction}
            </Modal>
            <div className={`${classes.hContainer}`}>
                <div className={classes.navContainer}>
                    <Navbar
                        tabs={TABS}
                        activeTab={activeTab}
                        setActiveTab={(activeTab: string) => {
                            setParams({ activeTab: activeTab })
                        }}
                    />
                    <button
                        onClick={() => setFormOpened(true)}
                        className={classes.addButton}
                    >
                        + transaction
                    </button>
                </div>
                <div className={`${classes.container}`}>
                    <div
                        className={
                            activeTab === "History"
                                ? `${classes.historyBox}`
                                : classes.hiddenBox
                        }
                    >
                        {history}
                    </div>
                    <div className={classes.rightBox}>
                        <div
                            className={
                                activeTab === "Metrics"
                                    ? `${classes.metricsBox}`
                                    : classes.hiddenBox
                            }
                        >
                            <div className={classes.lbox}>{pie}</div>
                            <div className={classes.lbox}>{histogramm}</div>
                        </div>
                        <div
                            className={clsx(
                                card
                                    ? clsx(classes.lbox, classes.cardBox)
                                    : classes.hiddenBox
                            )}
                        >
                            {card ? <>{card}</> : formTransaction}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
