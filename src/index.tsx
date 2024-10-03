import { createRoot } from 'react-dom/client';
import init, { Application } from "../logic/pkg/logic";
import Root from './Root';

async function boot() {
  const app = new Application();



  const rootNode = document.getElementById('main');
  if (rootNode) {
    const root = createRoot(rootNode);
    root.render(<Root app={app} />);
  }

  // await eventPump(window, app);
}

init().then(boot);
