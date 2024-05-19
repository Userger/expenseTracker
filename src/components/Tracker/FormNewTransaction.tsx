import { useState } from "react";
import { useTransTypeCategory } from "../../hooks/useTransTypeCategory";
import { useHeightFormHistory } from "../../hooks/useHeightFormHistory";

export function FormNewTransaction({
  addTransaction,
}: {
  addTransaction: (p: {
    type: "expense" | "income";
    descr: string;
    num: number;
    category: string;
    date: string;
  }) => void;
}) {
  const { opened, openClose } = useHeightFormHistory();
  const [descr, setDescr] = useState("");
  const [sum, setSum] = useState("");
  const {
    categoryType: { transType, category },
    setCategory,
    setTransType,
  } = useTransTypeCategory();
  const [date, setDate] = useState<string>("2024-05-18");

  function canSubmit() {
    if (descr.trim() && sum && transType) {
      return true;
    }
  }

  function onSubmit() {
    if (descr && sum && transType) {
      addTransaction({
        descr: descr,
        num: Number(sum),
        type: transType,
        category: category,
        date: date,
      });
      setDescr("");
      setSum("");
    }
  }
  return (
    <div className="tracker-form-container">
      <h3 onClick={openClose}>New transaction</h3>
      <form className={`tracker-form ${opened ? "tracker-form-opened" : ""}`}>
        <div className="tracker-h-flex">
          <select
            className={`tracker-form-select ${sum ? "tracker-form-input-hasText" : ""}`}
            onChange={(e) => {
              setTransType(e.target.value as "expense" | "income");
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
              if (!/(^\d*(?<=\d)\.?\d*$)|^$/m.test(e.target.value)) {
                e.preventDefault();
                return;
              }
              setSum(e.target.value);
            }}
          />
        </div>
        <div className="tracker-h-flex">
          <select
            className={`tracker-form-select ${descr.trim() ? "tracker-form-input-hasText" : ""}`}
            onChange={(e) => {
              setCategory(e.target.value);
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
              setDescr(e.target.value);
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
            e.preventDefault();
            onSubmit();
          }}
        >
          add
        </button>
      </form>
    </div>
  );
}
