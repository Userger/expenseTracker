import { ReactNode, memo } from "react";

export const History = memo(function History({
  history,
}: {
  history: ReactNode;
}) {
  return (
    <div className="tracker-history-container">
      <h3>History</h3>
      <ul className={`tracker-historyList`}>{history}</ul>
    </div>
  );
});
