import {combineReducers} from "redux";

import joke, {JokeState} from "./joke";
import categories, {CategoriesState} from "./categories";

export interface State {
    jokes: JokeState,
    categories: CategoriesState,
}

const rootReducer = combineReducers({
    joke,
    categories,
});

export default rootReducer;
