import { memo, useState } from "react"
import { useTransTypeCategory } from "../../hooks/useTransTypeCategory"
import { getDateString } from "../../hooks/useTransaction"
import classes from "./styles/form.module.css"

export const FormNewTransaction = memo(function FormNewTransaction({
    addTransaction,
}: {
    addTransaction: (
        date: string,
        num: number,
        category: string,
        descr: string
    ) => void
}) {
    console.log("form")
    const [sum, setSum] = useState("")
    const [descr, setDescr] = useState("")
    const {
        categoryType: { transType, category },
        setCategory,
        setTransType,
    } = useTransTypeCategory()
    const [date, setDate] = useState<string>(getDateString(new Date()))

    function canSubmit() {
        if (descr.trim() && sum && transType) {
            return true
        }
    }

    function onSubmit() {
        if (descr && sum && transType) {
            addTransaction(
                date,
                Number(transType === "expense" ? -sum : sum),
                category,
                descr
            )
            setDescr("")
            setSum("")
        }
    }

    return (
        <div className={`tracker-out-box ${classes.form}`}>
            <form className={`${classes.container}`}>
                <div className={classes.hContainer}>
                    <select
                        className={`${classes.select} ${sum ? classes.inputHasText : ""}`}
                        onChange={(e) => {
                            setTransType(e.target.value as "expense" | "income")
                        }}
                        value={transType}
                    >
                        <option value="expense">expense</option>
                        <option value="income">income</option>
                    </select>
                    <input
                        autoComplete="off"
                        id="tracker-value"
                        className={`${classes.input} ${sum ? classes.inputHasText : ""}`}
                        type="text"
                        value={sum}
                        placeholder={`how much you ${transType === "income" ? "got" : "spent"}...`}
                        onChange={(e) => {
                            if (
                                !/(^\d*(?<=\d)\.?\d*$)|^$/m.test(e.target.value)
                            ) {
                                e.preventDefault()
                                return
                            }
                            setSum(e.target.value)
                        }}
                    />
                </div>
                <div className={classes.hContainer}>
                    <select
                        className={`${classes.select} ${descr.trim() ? classes.inputHasText : ""}`}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        value={category}
                    >
                        {transType === "expense" ? (
                            <>
                                <option value="food">food</option>
                                <option value="cloth">cloth</option>
                            </>
                        ) : (
                            <>
                                <option value="salary">salary</option>
                                <option value="transfer">transfer</option>
                            </>
                        )}
                    </select>
                    <input
                        autoComplete="off"
                        id="tracker-descr"
                        className={`${classes.input} ${descr.trim() ? classes.inputHasText : ""}`}
                        type="text"
                        value={descr}
                        placeholder="Enter description..."
                        onChange={(e) => {
                            setDescr(e.target.value)
                        }}
                    />
                </div>
                <input
                    className={`${classes.input} ${descr.trim() && sum ? classes.inputHasText : ""}`}
                    defaultValue={date}
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    className={classes.submitButton}
                    type="submit"
                    disabled={!canSubmit()}
                    onClick={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                >
                    add
                </button>
            </form>
        </div>
    )
})
