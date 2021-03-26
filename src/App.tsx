import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Joke from "./components/Joke";
import {State} from "./store/reducers";
import {JokeState} from "./store/reducers/joke";
import {fetchJoke} from "./store/actions/jokes";
import Categories from "./components/Categories";
import {CategoriesState} from "./store/reducers/categories";

function App() {
    const dispatch = useDispatch();
    const joke = useSelector<State, JokeState>((state) => state.joke);
    const categories = useSelector<State, CategoriesState>((state) => state.categories);

    const handleSelect = (category: string) => {
        dispatch(fetchJoke(category));
    };

    return (
        <>
            <Categories categories={categories} onSelect={handleSelect}/>
            <Joke joke={joke}/>
        </>
    );
}

export default App;
