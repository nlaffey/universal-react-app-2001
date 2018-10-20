import { AppLocation, RenderRoute } from './renderRoute';

describe('renderRoute', () => {

  let renderRoute: RenderRoute;
  beforeAll(() => {
    jest.mock('../universal-router/appUniversalRouter');
    jest.mock('../utils/getInitialPropsRecursively');
    jest.mock('react-dom', () => ({
      hydrate: jest.fn(),
      render: jest.fn()
    }));
    renderRoute = require('./renderRoute').renderRoute;
  });
  test('should call getInitialPropsRecursively', async () => {
    const location: AppLocation = {
      pathname: 'mock/path/name',
      search: '?mockSearch'
    };
    const mockElement: any = { mockElement: true };
    await renderRoute(location, mockElement, true);
    const getInitialPropsRecursively = require('../utils/getInitialPropsRecursively').default;
    expect(getInitialPropsRecursively.mock.calls).toMatchSnapshot();
  });

  test('should call resolve twice, once without props, once with props', async () => {
    const location: AppLocation = {
      pathname: 'mock/path/name',
      search: '?mockSearch'
    };
    const mockElement: any = { mockElement: true };
    await renderRoute(location, mockElement, true);
    const { resolve } = require('../universal-router/appUniversalRouter').default;
    expect(resolve.mock.calls).toMatchSnapshot();
  });

  test('should call hydrate when is initial render', async () => {
    const location: AppLocation = {
      pathname: 'mock/path/name',
      search: '?mockSearch'
    };
    const mockElement: any = { mockElement: true };
    await renderRoute(location, mockElement, true);
    const { hydrate } = require('react-dom');
    expect(hydrate.mock.calls).toMatchSnapshot();
  });

  test('should call render when not initial render', async () => {
    const location: AppLocation = {
      pathname: 'mock/path/name',
      search: '?mockSearch'
    };
    const mockElement: any = { mockElement: true };
    await renderRoute(location, mockElement, false);
    const { render } = require('react-dom');
    expect(render.mock.calls).toMatchSnapshot();
  });
});
