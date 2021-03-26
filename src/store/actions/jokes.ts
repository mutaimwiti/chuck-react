import api from "../../api";
import {Action} from "./Action";
import {FETCH_JOKE} from "../ActionTypes";

export const fetchJoke = (category: string): Action => ({
    type: FETCH_JOKE,
    request: api.jokes.get(category),
});
