import { createContext, StrictMode, useEffect } from "react";
import * as ReactRedux from 'react-redux';

import { Application, Events } from "../logic/pkg/logic";
import UiFrame from "./UiFrame";
import { AppDispatch, store } from './store';

export const AppContext = createContext<Application | null>(null);

async function eventPump(events: Events, dispatch: AppDispatch) {
  while (true) {
    let e = await events.next();
    let e2 = { type: e.name, payload: e.payload };
    dispatch(e2);
  }
}

const Root: React.FC<{ app: Application }> = ({app}) => {
  useEffect(() => {
    const events = app.events();

    if (events) {
      eventPump(events, store.dispatch); // letting this promise go forever
    }
  }, [app]);

  return (
    <StrictMode>
      <ReactRedux.Provider store={store}>
        <AppContext.Provider value={app}>
          <UiFrame />
        </AppContext.Provider>
      </ReactRedux.Provider>
    </StrictMode>
  );
};

export default Root;
