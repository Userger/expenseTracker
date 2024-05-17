import { useState } from "react";

export function useHeightFormHistory() {
  const [opened, setState] = useState<boolean>(true);

  function openClose() {
    setState((prev) => !prev);
  }
  return { openClose, opened };
}
