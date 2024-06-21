import { Link } from "../ui/link"
import classes from "./sidebar.module.css"

export function Sidebar() {
    return (
        <div className={classes.sidebar}>
            <nav className={classes.nav}>
                <Link title="home" to="/">
                    Home
                </Link>
                <Link title="history" to="history">
                    History
                </Link>
                <Link title="stats" to="stats">
                    Stats
                </Link>
            </nav>
        </div>
    )
}
