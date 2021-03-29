import {Action} from "../actions/Action";
import {FETCH_JOKE, SEARCH_JOKES} from "../ActionTypes";

export type JokeState = {
    icon_url: string,
    id: string,
    url: string,
    value: string
};

export type SearchState = JokeState[];

export const joke = (state: JokeState | null = null, action: Action) => {
    switch (action.type) {
        case `${FETCH_JOKE}_SUCCESS`: {
            return action.payload;
        }
        default:
            return state;
    }
}

export const searchResults = (state: SearchState = [], action: Action) => {
    switch (action.type) {
        case `${SEARCH_JOKES}_SUCCESS`: {
            return action.payload.result;
        }
        default:
            return state;
    }
}
