import { AppRouteHandlers, AppRouteService } from './appRouteService';

describe('AppRouteService', () => {
  let appRouteHandlerService: AppRouteService;
  beforeAll(() => {
    jest.mock('../services/contentful/contentfulService.ts');
    jest.mock('../utils/getInitialPropsRecursively.ts');
    jest.mock('react-dom/server');
    appRouteHandlerService = require('./appRouteService').default;
  });

  describe('createAppRouteHandlers', () => {
    test('should create route functions that match the snapshot', () => {
      const appRouteHandlers = appRouteHandlerService.createAppRouteHandlers({ port: 200, universalRouter: jest.fn() });
      expect(appRouteHandlers).toMatchSnapshot();
    });
  });

  describe('handleContentfulGetRequest', () => {
    let appRouteHandlers: AppRouteHandlers;
    beforeEach(() => {
      appRouteHandlers = appRouteHandlerService.createAppRouteHandlers({ port: 200, universalRouter: jest.fn() });
    });

    test('should call contentful api and send entry json', async () => {
      const req: any = { params: { entryId: 'mockId' } };
      const res: any = { send: jest.fn(), setHeader: jest.fn() };
      const next: any = {};
      await appRouteHandlers.handleContentfulGetRequest(req, res, next);
      expect(res.send.mock.calls).toMatchSnapshot();
    });

    test('should set header information for cached json', async () => {
      const req: any = { params: { entryId: 'mockId' } };
      const res: any = { send: jest.fn(), setHeader: jest.fn() };
      const next: any = {};
      await appRouteHandlers.handleContentfulGetRequest(req, res, next);
      expect(res.setHeader.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleUniversalRouterComponentRendering', () => {
    let appRouteHandlers: AppRouteHandlers;
    let mockUniversalRouter;
    beforeEach(() => {
      mockUniversalRouter = { resolve: jest.fn(() => Promise.resolve({ mockComponent: true })) };
      appRouteHandlers = appRouteHandlerService.createAppRouteHandlers({
        port: 2000,
        universalRouter: mockUniversalRouter
      });
    });

    test('should call the universal router with the context, pathname and query', async () => {
      const req: any = { url: '/mockPath123?foo=baz' };
      const res: any = { send: jest.fn(), setHeader: jest.fn() };
      const next: any = {};
      await appRouteHandlers.handleUniversalRouterComponentRendering(req, res, next);
      expect(mockUniversalRouter.resolve.mock.calls).toMatchSnapshot();
    });

    test('should call getInitialProps method passing in the component and context info', async () => {
      const req: any = { url: '/mockPath123?foo=baz' };
      const res: any = { send: jest.fn(), setHeader: jest.fn() };
      const next: any = {};
      const getInitialPropsRecursively = require('../utils/getInitialPropsRecursively').default;
      await appRouteHandlers.handleUniversalRouterComponentRendering(req, res, next);
      expect(getInitialPropsRecursively.mock.calls).toMatchSnapshot();
    });

    test('should send html with initial props populated', async (done) => {
      const req: any = { url: '/mockPath123?foo=baz' };
      const res: any = { send: jest.fn(), setHeader: jest.fn() };
      const next: any = {};
      await appRouteHandlers.handleUniversalRouterComponentRendering(req, res, next);
      // TODO: Look into why i'm needing to use a timeout here
      window.setTimeout(() => {
        expect(res.send.mock.calls).toMatchSnapshot();
        done();
      });
    });
  });
});
