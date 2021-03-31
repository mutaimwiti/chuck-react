import axios from 'axios';
import httpMiddleware, { baseUrl } from './httpMiddleware';

jest.mock('axios', () => {
  return { get: jest.fn() };
});

jest.useFakeTimers();

describe('httpMiddleware', function () {
  let nextMock: jest.Mock, store: { dispatch: jest.Mock }, actionThunk: any;

  beforeEach(() => {
    nextMock = jest.fn();
    store = {
      dispatch: jest.fn(),
    };

    const parentThunk = httpMiddleware(store);

    actionThunk = parentThunk(nextMock);
  });

  afterEach(() => {
    nextMock.mockClear();
    store.dispatch.mockClear();
  });

  describe('when action does not have request property', () => {
    beforeEach(() => {
      actionThunk({
        type: 'SOME_ACTION',
      });
    });

    it('should ignore it', () => {
      expect(nextMock).toHaveBeenCalledWith({ type: 'SOME_ACTION' });
    });
  });

  describe('when action has request property', () => {
    const request = { method: 'get', path: 'categories' };
    const response = { someValue: 'someValue' };

    beforeEach(() => {
      store.dispatch.mockClear();

      (axios.get as any).mockReturnValue(
        Promise.resolve({
          data: response,
        }),
      );

      actionThunk({
        type: 'SOME_ACTION',
        request,
      });
    });

    it('should make appropriate api call using axios', () => {
      const requestUrl = `${baseUrl}/${request.path}`;
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(requestUrl);
    });

    it('should dispatch action.type postfixed with _REQUESTING', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        type: 'SOME_ACTION_REQUESTING',
      });
    });

    it('should dispatch action.type postfixed with _SUCCESS', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        type: 'SOME_ACTION_SUCCESS',
        payload: response,
      });
    });

    describe('when axios request is unsuccessful', () => {
      beforeEach(() => {
        store.dispatch.mockClear();

        (axios.get as any).mockReturnValue(Promise.reject(Error()));

        actionThunk({
          type: 'SOME_ACTION',
          request,
        });
      });

      it('should dispatch action.type postfixed with _REQUESTING', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, {
          type: 'SOME_ACTION_REQUESTING',
        });
      });

      it('should dispatch action.type postfixed with _FAILURE', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenNthCalledWith(2, {
          type: 'SOME_ACTION_FAILURE',
        });
      });
    });
  });
});
