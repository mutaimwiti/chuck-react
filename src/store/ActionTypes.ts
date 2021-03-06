export type Action = {
  type: string;
  payload?: any;
  request?: any;
};

export const SEARCH_JOKES = 'SEARCH_JOKES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_JOKE = 'FETCH_JOKE_BY_CATEGORY';
export const CLEAR_SEARCH_JOKES = 'CLEAR_SEARCH_JOKES';
