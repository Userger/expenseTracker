import classes from "./styles/navbar.module.css"
export function Navbar({
    tabs,
    activeTab,
    setActiveTab,
}: {
    tabs: string[]
    activeTab: string
    setActiveTab: ({ activeTab }: { activeTab: string }) => void
}) {
    return (
        <nav className={classes.nav}>
            <ul className={classes.ul}>
                {tabs.map((t) => (
                    <li key={t}>
                        <button
                            className={`tracker-button ${classes.button} ${t === activeTab ? classes.active : ""}`}
                            onClick={() => setActiveTab({ activeTab: t })}
                        >
                            {t}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
