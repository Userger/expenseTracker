import classes from "./navbar.module.css"
export function Navbar({
    tabs,
    activeTab,
    setActiveTab,
}: {
    tabs: string[]
    activeTab: string
    setActiveTab: (activeTab: string) => void
}) {
    return (
        <nav className={classes.nav}>
            <ul className={classes.ul}>
                {tabs.map((t) => (
                    <li key={t}>
                        <button
                            className={`tracker-button ${classes.button} ${t === activeTab ? classes.active : ""}`}
                            onClick={() => setActiveTab(t)}
                        >
                            {t}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
