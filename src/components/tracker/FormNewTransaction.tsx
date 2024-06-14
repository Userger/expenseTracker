import { memo, useState } from "react"
import { useTransTypeCategory } from "../../hooks/useTransTypeCategory"
import { getDateString } from "../../hooks/useTransaction"
import classes from "./styles/form.module.css"
import { Input } from "../ui/input/Input"
import { CATEGORIES } from "../../constants/categories"

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
                <Input
                    value={String(sum)}
                    type={transType}
                    onChange={(e) => {
                        if (!/(^\d*(?<=\d)\.?\d*$)|^$/m.test(e.target.value)) {
                            e.preventDefault()
                            return
                        }
                        setSum(e.target.value)
                    }}
                    select={
                        <Input.select
                            options={["expense", "income"]}
                            setOption={(s) =>
                                setTransType(s as "expense" | "income")
                            }
                        />
                    }
                />
                <Input
                    value={descr}
                    type={category}
                    onChange={(e) => {
                        setDescr(e.target.value)
                    }}
                    select={
                        <Input.select
                            options={
                                transType === "income"
                                    ? CATEGORIES.INCOME
                                    : CATEGORIES.EXPENSE
                            }
                            setOption={(s) => setCategory(s)}
                        />
                    }
                />
                <div
                    className={`${classes.hContainer} ${sum && descr.trim() ? classes.active : ""}`}
                >
                    <input
                        className={`${classes.input}`}
                        defaultValue={date}
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
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
