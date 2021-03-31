import api from '../../utils/api';
import { Action, FETCH_CATEGORIES } from '../ActionTypes';

export const fetchCategories = (): Action => ({
  type: FETCH_CATEGORIES,
  request: api.categories.list(),
});
