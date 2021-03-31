import { FETCH_CATEGORIES } from '../ActionTypes';
import categories, { initialState } from './categories';

describe('categories()', function () {
  describe('when action is irrelevant', () => {
    it('should return default state', () => {
      const action = { type: 'SOME_ACTION' };

      const nextState = categories(initialState, action);

      expect(nextState).toEqual(initialState);
    });
  });

  describe('when action is FETCH_CATEGORIES_SUCCESS', () => {
    it('should return the categories', () => {
      const items = ['art', 'science', 'business'];

      const action = {
        type: `${FETCH_CATEGORIES}_SUCCESS`,
        payload: items,
      };

      const nextState = categories(initialState, action);

      expect(nextState).toEqual(items);
    });
  });
});
