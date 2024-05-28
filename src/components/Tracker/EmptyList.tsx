import { useOpenForm } from "../../store/formOpened"
import classes from "./styles/emptyList.module.css"

export function EmptyList() {
    const { formOpened } = useOpenForm()
    return (
        <div className={classes.emptyList}>
            empty list...
            {formOpened ? "" : <div className={classes.arrow}>↓</div>}
        </div>
    )
}
