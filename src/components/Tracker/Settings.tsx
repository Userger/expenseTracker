import { ReactNode, useState } from "react";

export function Settings({ currencyChoose }: { currencyChoose: ReactNode }) {
  const [opened, setOpened] = useState(false);
  return (
    <div
      className={`tracker-settings ${opened ? "tracker-settings-opened" : ""}`}
    >
      <div
        className="tracker-settings-bar"
        onClick={() => setOpened((prev) => !prev)}
      >
        <div className={`tracker-settings-title`}>settings</div>
        <div className={`tracker-settings-sign`}>⚙</div>
      </div>
      <div
        className={`tracker-settings-field ${opened ? "tracker-settings-field-opened" : ""}`}
      >
        {currencyChoose}
      </div>
    </div>
  );
}
