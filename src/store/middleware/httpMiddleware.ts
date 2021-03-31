import axios from 'axios';
import { Action } from '../ActionTypes';
import { RequestType } from '../../utils/api';

export const baseUrl = 'https://api.chucknorris.io/jokes';

const httpMiddleware = (store: any) => (next: any) => (action: Action) => {
  if (action.request) {
    const { method, path }: RequestType = action.request;

    const url = `${baseUrl}/${path}`;

    store.dispatch({
      type: `${action.type}_REQUESTING`,
    });

    (axios as any)
      [method](url)
      .then((response: { data: any }) => {
        store.dispatch({
          type: `${action.type}_SUCCESS`,
          payload: response.data,
        });
      })
      .catch(() => {
        store.dispatch({
          type: `${action.type}_FAILURE`,
        });
      });
  } else {
    return next(action);
  }
};

export default httpMiddleware;
