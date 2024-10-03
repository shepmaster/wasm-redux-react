import { useCallback, useContext } from "react";

import { AppContext} from "./Root";
import { selectHighlight } from "./features/counter/counterSlice";
import { useAppSelector } from "./hooks";

const UiFrame: React.FC = () => {
  const app = useContext(AppContext);
  const handleClick = useCallback(() => app?.increment(), [app]);
  const isHighlight = useAppSelector(selectHighlight);

  return (
    <>
      <h1>Hello, World!</h1>
      <button onClick={handleClick}>Increment</button>
      <p>
        { isHighlight ? <b>Data</b> : <span>Data</span> }
      </p>
    </>
  );
};

export default UiFrame;
