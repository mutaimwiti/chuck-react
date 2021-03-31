import React, { useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  fetchJoke,
  searchJokes,
  clearSearchJokes,
} from '../../store/actions/jokes';
import Joke from '../../components/Joke';
import NavBar from '../../components/NavBar';
import Search from '../../components/Search';
import { State } from '../../store/reducers';
import { getRandomElement } from '../../utils/helpers';
import { fetchCategories } from '../../store/actions/categories';
import { CategoriesState } from '../../store/reducers/categories';
import { JokeState, SearchState } from '../../store/reducers/joke';

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { category }: any = useParams();
  const joke = useSelector<State, JokeState>((state) => state.joke);
  const categories = useSelector<State, CategoriesState>(
    (state) => state.categories,
  );
  const searchResults = useSelector<State, SearchState>(
    (state) => state.searchResults,
  );

  const loadJoke = useCallback(() => {
    dispatch(fetchJoke(category));
  }, [dispatch, category]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      loadJoke();
    } else if (!category && categories.length) {
      history.push(getRandomElement(categories));
    }
  }, [category, categories, history, dispatch, loadJoke]);

  const handleSelect = (category: string) => history.push(`/${category}`);

  const handleSearch = (query: string) => dispatch(searchJokes(query));

  const handleClearSearch = () => dispatch(clearSearchJokes());

  return (
    <>
      <NavBar onGoHome={() => handleSelect('')} />
      <Container>
        <Row>
          <Joke
            category={category}
            joke={joke}
            onLoadAnotherJoke={loadJoke}
            categories={categories}
            onSelectCategory={handleSelect}
          />
        </Row>
        <Row>
          <Col>
            <Search
              results={searchResults}
              onSearch={handleSearch}
              onClearSearch={handleClearSearch}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
