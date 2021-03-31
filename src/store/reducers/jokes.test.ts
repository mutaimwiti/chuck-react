import {
  joke,
  searchResults,
  jokeInitialState,
  searchInitialState,
} from './joke';
import { FETCH_JOKE, SEARCH_JOKES } from '../ActionTypes';

describe('jokes', function () {
  describe('joke()', () => {
    describe('when action is irrelevant', () => {
      it('should return default state', () => {
        const action = { type: 'SOME_ACTION' };

        const nextState = joke(jokeInitialState, action);

        expect(nextState).toEqual(jokeInitialState);
      });
    });

    describe('when action is FETCH_JOKE_SUCCESS', () => {
      it('should return the categories', () => {
        const item = {
          icon_url: 'icon/url',
          id: 'someJokeId',
          url: 'joke/url',
          value: 'This is a joke',
        };

        const action = {
          type: `${FETCH_JOKE}_SUCCESS`,
          payload: item,
        };

        const nextState = joke(jokeInitialState, action);

        expect(nextState).toEqual(item);
      });
    });
  });

  describe('searchResults()', () => {
    describe('when action is irrelevant', () => {
      it('should return default state', () => {
        const action = { type: 'SOME_ACTION' };

        const nextState = searchResults(searchInitialState, action);

        expect(nextState).toEqual(searchInitialState);
      });
    });

    describe('when action is SEARCH_JOKES_REQUESTING', () => {
      it('should set isLoading to true ', () => {
        const action = {
          type: `${SEARCH_JOKES}_REQUESTING`,
        };

        const nextState = searchResults(searchInitialState, action);

        expect(nextState).toEqual({
          ...searchInitialState,
          isLoading: true,
        });
      });
    });

    describe('when action is SEARCH_JOKES_SUCCESS', () => {
      it('should set items and isLoading to false ', () => {
        const items = [
          {
            icon_url: 'icon/url',
            id: 'someJokeId',
            url: 'joke/url',
            value: 'This is a joke',
          },
          {
            icon_url: 'icon/url',
            id: 'someOtherJokeId',
            url: 'joke/url',
            value: 'This is another joke',
          },
        ];

        const action = {
          type: `${SEARCH_JOKES}_SUCCESS`,
          payload: { result: items },
        };

        const nextState = searchResults(searchInitialState, action);

        expect(nextState).toEqual({
          items,
          isLoading: false,
        });
      });
    });
  });
});
