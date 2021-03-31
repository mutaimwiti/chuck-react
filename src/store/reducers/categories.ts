import { Action } from '../actions/Action';
import { FETCH_CATEGORIES } from '../ActionTypes';

export type CategoriesState = string[];

export const initialState: CategoriesState = [];

const categories = (state: CategoriesState = initialState, action: Action) => {
  switch (action.type) {
    case `${FETCH_CATEGORIES}_SUCCESS`: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default categories;
