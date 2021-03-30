import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from './HomePage';
import Joke from '../components/Joke';
import Search from '../components/Search';
import NavBar from '../components/NavBar';
import {
  fetchJoke,
  searchJokes,
  clearSearchJokes,
} from '../store/actions/jokes';
import { fetchCategories } from '../store/actions/categories';

const mockHistory = { push: jest.fn(), replace: jest.fn() };
let mockParams: { category: string | undefined } = { category: 'business' };

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  esModule: true,
  useParams: () => mockParams,
  useHistory: () => mockHistory,
}));

jest.mock('../components/Joke');
jest.mock('../components/Search');
jest.mock('../components/NavBar');
jest.mock('../store/actions/jokes');
jest.mock('../store/actions/categories');

describe('HomePage', function () {
  const joke = {
    url: 'joke/url',
    id: 'someJokeId',
    icon_url: 'icon/url',
    value: 'This is a joke',
  };

  const anotherJoke = {
    url: 'joke/url',
    icon_url: 'icon/url',
    id: 'someOtherJokeId',
    value: 'This is another joke',
  };

  const jokes = [joke, anotherJoke];

  const categories = ['business', 'art', 'science'];

  const dispatchMock = jest.fn();

  let _onGoHome,
    _onSearch,
    _onClearSearch,
    _onLoadAnotherJoke,
    _onSelectCategory;

  beforeEach(() => {
    useSelector.mockImplementation((cb) =>
      cb({
        searchResults: { isLoading: false, items: jokes },
        categories,
        joke,
      }),
    );

    useDispatch.mockReturnValue(dispatchMock);

    NavBar.mockImplementation((props) => {
      _onGoHome = props.onGoHome;
      return <>***NavBar***</>;
    });

    Joke.mockImplementation((props) => {
      _onLoadAnotherJoke = props.onLoadAnotherJoke;
      _onSelectCategory = props.onSelectCategory;
      return <>***Joke***</>;
    });

    Search.mockImplementation((props) => {
      _onSearch = props.onSearch;
      _onClearSearch = props.onClearSearch;
      return <>***Joke***</>;
    });
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    dispatchMock.mockClear();
  });

  it('should not blow up', () => {
    expect(() => render(<HomePage />)).not.toThrow();
  });

  it('should match snapshot', () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
  });

  it('should dispatch fetchCategories', () => {
    render(<HomePage />);

    expect(fetchCategories).toHaveBeenCalledTimes(1);
  });

  it('should dispatch fetchJoke', () => {
    render(<HomePage />);

    expect(fetchJoke).toHaveBeenCalledTimes(1);
    expect(fetchJoke).toHaveBeenCalledWith('business');
  });

  describe('when category is not set', () => {
    beforeEach(() => {
      mockParams = { category: undefined };
    });

    afterEach(() => {
      mockParams = {
        category: 'business',
      };
    });

    it('should automatically set category route param to a random category', () => {
      render(<HomePage />);

      expect(mockHistory.push).toHaveBeenCalledTimes(1);
      expect(mockHistory.push).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('when onGoHome is triggered from NavBar component', () => {
    it('should automatically set category route param to a random category', () => {
      render(<HomePage />);

      _onGoHome();

      expect(mockHistory.push).toHaveBeenCalledTimes(1);
      expect(mockHistory.push).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('when onLoadAnotherJoke is triggered from Joke component', () => {
    it('should dispatch fetchJoke', () => {
      render(<HomePage />);

      _onLoadAnotherJoke();

      // the first call is when the joke first loads
      expect(fetchJoke).toHaveBeenNthCalledWith(1, 'business');
      expect(fetchJoke).toHaveBeenNthCalledWith(2, 'business');
    });
  });

  describe('when onSelectCategory is triggered from Joke component', () => {
    it('should set category route param to the selected category', () => {
      render(<HomePage />);

      _onSelectCategory('money');

      expect(mockHistory.push).toHaveBeenCalledTimes(1);
      expect(mockHistory.push).toHaveBeenCalledWith('/money');
    });
  });

  describe('when onSearch is triggered from Search component', () => {
    it('should dispatch searchJokes', () => {
      render(<HomePage />);

      _onSearch('fight');

      expect(searchJokes).toHaveBeenCalledTimes(1);
      expect(searchJokes).toHaveBeenCalledWith('fight');
    });
  });

  describe('when onClearSearch is triggered from Search component', () => {
    it('should dispatch clearSearchJokes', () => {
      render(<HomePage />);

      _onClearSearch();

      expect(clearSearchJokes).toHaveBeenCalledTimes(1);
    });
  });
});
