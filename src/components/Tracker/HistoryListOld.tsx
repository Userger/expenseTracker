import { ReactNode, memo } from "react";

export const History = memo(function History({
  historyList,
}: {
  historyList: ReactNode;
}) {
  console.log("history render");
  return (
    <div className="tracker-history-container">
      <h3>History</h3>
      <ul className={`tracker-historyList`}>{historyList}</ul>
    </div>
  );
});
