import React, {useEffect} from 'react';
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
import {fetchJoke, searchJokes} from "../store/actions/jokes";

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {category}: any = useParams();
    const joke = useSelector<State, JokeState>((state) => state.joke);
    const categories = useSelector<State, CategoriesState>((state) => state.categories);
    const searchResults = useSelector<State, SearchState>((state) => state.searchResults);

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

    const handleSearch = (query: string) => dispatch(searchJokes(query));

    return (
        <>
            <NavBar categories={categories} onSelectCategory={handleSelect}/>
            <Container>
                <Row>
                    <Joke category={category} joke={joke}/>
                </Row>
                <Row>
                    <Col>
                        <Search results={searchResults} onSearch={handleSearch}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
