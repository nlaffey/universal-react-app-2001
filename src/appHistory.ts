import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

let historySingleton;
if (typeof window !== 'undefined') {
  console.log('Creating browser history');
  historySingleton = createBrowserHistory();
} else {
  console.log('Creating memory history');
  historySingleton = createMemoryHistory();
}

const appHistory = {
  push: (path) => {
    console.log(`Navigating to ${path}`);
    historySingleton.push(path);
  },
  listen: (method) => {
    historySingleton.listen(method);
  }
};

export default appHistory;

