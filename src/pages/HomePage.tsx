import React, {useCallback, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";

import Joke from "../components/Joke";
import {State} from "../store/reducers";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import {getRandomElement} from "../utils";
import {fetchCategories} from "../store/actions/categories";
import {CategoriesState} from "../store/reducers/categories";
import {JokeState, SearchState} from "../store/reducers/joke";
import {clearSearchJokes, fetchJoke, searchJokes} from "../store/actions/jokes";

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {category}: any = useParams();
    const joke = useSelector<State, JokeState>((state) => state.joke);
    const categories = useSelector<State, CategoriesState>((state) => state.categories);
    const searchResults = useSelector<State, SearchState>((state) => state.searchResults);

    const loadJoke = useCallback(() => {
        dispatch(fetchJoke(category));
    }, [dispatch, category])

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (category) {
            loadJoke();
        } else if (!category && categories.length) {
            history.push(getRandomElement(categories))
        }
    }, [category, categories, history, dispatch, loadJoke]);

    const handleSelect = (category: string) => history.push(`/${category}`);

    const handleSearch = (query: string) => dispatch(searchJokes(query));

    const handleClearSearch = () => dispatch(clearSearchJokes());

    return (
        <>
            <NavBar categories={categories} onSelectCategory={handleSelect}/>
            <Container>
                <Row>
                    <Joke category={category} joke={joke} onLoadAnotherJoke={loadJoke}/>
                </Row>
                <Row>
                    <Col>
                        <Search results={searchResults} onSearch={handleSearch} onClearSearch={handleClearSearch}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
