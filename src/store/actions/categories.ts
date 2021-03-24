import api from "../../api";
import {Action} from "./Action";
import {FETCH_CATEGORIES} from "../ActionTypes";

export const fetchCategories = (): Action => ({
    type: FETCH_CATEGORIES,
    request: api.categories.list(),
});
