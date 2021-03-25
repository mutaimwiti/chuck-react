import {Action} from "../actions/Action";
import {FETCH_JOKE} from "../ActionTypes";

export type JokeState = {
    icon_url: string,
    id: string,
    url: string,
    value: string
} | {};

const initialState: JokeState = {};

const joke = (state: JokeState = initialState, action: Action) => {
    switch (action.type) {
        case `${FETCH_JOKE}_SUCCESS`: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default joke;
