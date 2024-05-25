import { memo, useState } from "react"
import { useTransTypeCategory } from "../../hooks/useTransTypeCategory"
import { useOpenForm } from "../../store/formOpened"
import { getDateString } from "../../hooks/useTransaction"

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
    const { formOpened, openCloseForm } = useOpenForm()
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
                descr,
            )
            setDescr("")
            setSum("")
        }
    }
    return (
        <div className="tracker-out-box tracker-form">
            <h2
                onClick={openCloseForm}
                className="tracker-title tracker-form-title"
            >
                New transaction:
            </h2>
            <form
                className={`tracker-form-container ${formOpened ? "tracker-form-container-opened" : ""}`}
            >
                <div className="tracker-form-h-container">
                    <select
                        className={`tracker-form-select ${sum ? "tracker-form-input-hasText" : ""}`}
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
                        className={`tracker-form-input ${sum ? "tracker-form-input-hasText" : ""}`}
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
                <div className="tracker-form-h-container">
                    <select
                        className={`tracker-form-select ${descr.trim() ? "tracker-form-input-hasText" : ""}`}
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
                        className={`tracker-form-input ${descr.trim() ? "tracker-form-input-hasText" : ""}`}
                        type="text"
                        value={descr}
                        placeholder="Enter description..."
                        onChange={(e) => {
                            setDescr(e.target.value)
                        }}
                    />
                </div>
                <input
                    defaultValue={date}
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    className="tracker-form-submitButton"
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
