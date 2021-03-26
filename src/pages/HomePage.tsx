import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";

import Joke from "../components/Joke";
import {State} from "../store/reducers";
import {JokeState} from "../store/reducers/joke";
import {fetchJoke} from "../store/actions/jokes";
import Categories from "../components/Categories";
import {CategoriesState} from "../store/reducers/categories";

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {category}: any = useParams();
    const joke = useSelector<State, JokeState>((state) => state.joke);
    const categories = useSelector<State, CategoriesState>((state) => state.categories);

    useEffect(() => {
        if (category) {
            dispatch(fetchJoke(category));
        } else if (!category && categories.length) {
            history.push(categories[0])
        }
    }, [category, categories, history, dispatch]);

    const handleSelect = (category: string) => history.push(`/${category}`);

    return (
        <>
            <Categories categories={categories} onSelect={handleSelect}/>
            <Joke joke={joke}/>
        </>
    );
}

export default HomePage;
