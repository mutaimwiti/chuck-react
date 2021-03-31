import api from '../../utils/api';
import { Action } from './Action';
import { CLEAR_SEARCH_JOKES, FETCH_JOKE, SEARCH_JOKES } from '../ActionTypes';

export const fetchJoke = (category: string): Action => ({
  type: FETCH_JOKE,
  request: api.jokes.get(category),
});

export const searchJokes = (query: string): Action => ({
  type: SEARCH_JOKES,
  request: api.jokes.search(query),
});

export const clearSearchJokes = (): Action => ({
  type: CLEAR_SEARCH_JOKES,
});
