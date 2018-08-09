import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const appHistory = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();
export default appHistory;