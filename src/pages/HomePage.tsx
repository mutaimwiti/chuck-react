import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";

import Joke from "../components/Joke";
import {State} from "../store/reducers";
import NavBar from "../components/NavBar";
import {getRandomElement} from "../utils";
import {JokeState} from "../store/reducers/joke";
import {fetchJoke} from "../store/actions/jokes";
import {fetchCategories} from "../store/actions/categories";
import {CategoriesState} from "../store/reducers/categories";

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {category}: any = useParams();
    const joke = useSelector<State, JokeState>((state) => state.joke);
    const categories = useSelector<State, CategoriesState>((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (category) {
            dispatch(fetchJoke(category));
        } else if (!category && categories.length) {
            history.push(getRandomElement(categories))
        }
    }, [category, categories, history, dispatch]);

    const handleSelect = (category: string) => history.push(`/${category}`);

    return (
        <>
            <NavBar categories={categories} onSelectCategory={handleSelect}/>
            <Joke category={category} joke={joke}/>
        </>
    );
}

export default HomePage;
