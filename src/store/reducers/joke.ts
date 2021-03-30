import {Action} from "../actions/Action";
import {CLEAR_SEARCH_JOKES, FETCH_JOKE, SEARCH_JOKES} from "../ActionTypes";

export type JokeState = {
    icon_url: string,
    id: string,
    url: string,
    value: string
};

export type SearchState = { items: JokeState[], isLoading: boolean };

const jokeInitialState = null;

export const joke = (state: JokeState | null = jokeInitialState, action: Action) => {
    switch (action.type) {
        case `${FETCH_JOKE}_SUCCESS`: {
            return action.payload;
        }
        default:
            return state;
    }
}

const searchInitialState = {items: [], isLoading: false};

export const searchResults = (state: SearchState = searchInitialState, action: Action) => {
    switch (action.type) {
        case `${SEARCH_JOKES}_SUCCESS`: {
            return {items: action.payload.result, isLoading: false};
        }
        case `${SEARCH_JOKES}_REQUESTING`: {
            return {...state, isLoading: true};
        }
        case CLEAR_SEARCH_JOKES: {
            return searchInitialState;
        }
        default:
            return state;
    }
}
