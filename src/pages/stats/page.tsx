import { GreatestTransactions } from "../../components/tracker/greatestTransactions/GreatestTransactions"
import { Histogramm } from "../../components/tracker/histogramm/Histogramm"
import { PieDiagramm } from "../../components/ui/diagrams/pie"
import { useNotEmptyCurrency } from "../../hooks/useNotEmptyCurrency"
import { useTransaction } from "../../store/transactions"
import classes from "./index.module.css"
export function Stats() {
    const { income, expense, history } = useTransaction()
    useNotEmptyCurrency()
    return (
        <div className={classes.stats}>
            <Histogramm history={history} />
            <PieDiagramm
                colors={["var(--red-color)", "var(--green-color)"]}
                data={[
                    { name: "income", value: income },
                    { name: "expense", value: -expense },
                ]}
            />
            <GreatestTransactions history={history} />
        </div>
    )
}
