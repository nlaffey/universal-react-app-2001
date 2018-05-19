import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

let history;
if (typeof window !== 'undefined') {
  console.log('Creating browser history');
  history = createBrowserHistory();
} else {
  console.log('Creating memory history');
  history = createMemoryHistory();
}

const historyMiddleware = {
  push: (path) => {
    console.log(`Navigating to ${path}`);
    history.push(path);
  },
  listen: (method) => {
    history.listen(method);
  }
};

export default historyMiddleware;
