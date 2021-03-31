import api from '../../utils/api';
import { fetchCategories } from './categories';
import { FETCH_CATEGORIES } from '../ActionTypes';

describe('categories', function () {
  describe('fetchCategories()', () => {
    let dispatchMock: jest.Mock;

    beforeEach(() => {
      dispatchMock = jest.fn();
    });

    afterEach(() => {
      dispatchMock.mockClear();
    });

    describe('when the action creator is called', () => {
      it('should create an action to fetch categories', function () {
        const expectedAction = {
          type: FETCH_CATEGORIES,
          request: api.categories.list(),
        };

        expect(fetchCategories()).toEqual(expectedAction);
      });
    });
  });
});
