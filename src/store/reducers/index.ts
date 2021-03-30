import { combineReducers } from 'redux';

import categories, { CategoriesState } from './categories';
import { joke, searchResults, JokeState, SearchState } from './joke';

export interface State {
  joke: JokeState;
  searchResults: SearchState;
  categories: CategoriesState;
}

const rootReducer = combineReducers({
  joke,
  categories,
  searchResults,
});

export default rootReducer;
