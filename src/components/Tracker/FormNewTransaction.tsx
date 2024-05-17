import { useState } from "react";

export function FormNewTransaction({
  addTransaction,
  opened,
  openClose,
}: {
  addTransaction: (p: {
    type: "expense" | "income";
    descr: string;
    num: number;
  }) => void;
  opened: boolean;
  openClose: () => void;
}) {
  const [descr, setDescr] = useState("");
  const [sum, setSum] = useState("");
  const [transType, setTransType] = useState<"expense" | "income">("expense");

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
            defaultValue="expense"
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
