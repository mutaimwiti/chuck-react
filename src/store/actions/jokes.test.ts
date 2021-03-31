import api from '../../utils/api';
import { clearSearchJokes, fetchJoke, searchJokes } from './jokes';
import { CLEAR_SEARCH_JOKES, FETCH_JOKE, SEARCH_JOKES } from '../ActionTypes';

describe('jokes', function () {
  describe('fetchJoke()', () => {
    let dispatchMock: jest.Mock;

    beforeEach(() => {
      dispatchMock = jest.fn();
    });

    afterEach(() => {
      dispatchMock.mockClear();
    });

    describe('when the action creator is called', () => {
      it('should create an action to fetch joke', function () {
        const category = 'art';

        const expectedAction = {
          type: FETCH_JOKE,
          request: api.jokes.get(category),
        };

        expect(fetchJoke(category)).toEqual(expectedAction);
      });
    });
  });

  describe('searchJokes()', () => {
    let dispatchMock: jest.Mock;

    beforeEach(() => {
      dispatchMock = jest.fn();
    });

    afterEach(() => {
      dispatchMock.mockClear();
    });

    describe('when the action creator is called', () => {
      it('should create an action to search joke', function () {
        const query = 'food';

        const expectedAction = {
          type: SEARCH_JOKES,
          request: api.jokes.search(query),
        };

        expect(searchJokes(query)).toEqual(expectedAction);
      });
    });
  });

  describe('clearSearchJokes()', () => {
    let dispatchMock: jest.Mock;

    beforeEach(() => {
      dispatchMock = jest.fn();
    });

    afterEach(() => {
      dispatchMock.mockClear();
    });

    describe('when the action creator is called', () => {
      it('should create an action to clear search jokes', function () {
        const expectedAction = {
          type: CLEAR_SEARCH_JOKES,
        };

        expect(clearSearchJokes()).toEqual(expectedAction);
      });
    });
  });
});
