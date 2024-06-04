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
                    <li
                        className={`${classes.li} ${t === activeTab ? classes.active : ""}`}
                        key={t}
                        onClick={() => setActiveTab({ activeTab: t })}
                    >
                        {t}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
