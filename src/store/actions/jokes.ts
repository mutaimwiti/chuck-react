import api from "../../api";
import {Action} from "./Action";
import {FETCH_CATEGORIES} from "../ActionTypes";

export const fetchJokeByCategory = (category: string): Action => ({
    type: FETCH_CATEGORIES,
    request: api.jokes.get(category),
});
