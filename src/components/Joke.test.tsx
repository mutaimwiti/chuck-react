import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import Joke, { JokeProps } from './Joke';

describe('Joke', function () {
  let props: JokeProps;

  beforeEach(() => {
    props = {
      category: 'sports',
      joke: {
        icon_url: 'icon/url',
        id: 'someJokeId',
        url: 'joke/url',
        value: 'This is a joke',
      },
      onLoadAnotherJoke: jest.fn(),
      categories: ['sports', 'art', 'food'],
      onSelectCategory: jest.fn(),
    };
  });

  it('should not blow up', () => {
    expect(() => render(<Joke {...props} />)).not.toThrow();
  });

  it('should match snapshot', () => {
    const { container } = render(<Joke {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display joke', () => {
    const { getByText } = render(<Joke {...props} />);

    expect(getByText('This is a joke')).toBeInTheDocument();
  });

  describe('when user clicks button to load another joke', () => {
    it('should invoke onLoadAnotherJoke', () => {
      const { getByTestId } = render(<Joke {...props} />);

      expect(props.onLoadAnotherJoke).not.toHaveBeenCalled();

      const button = getByTestId('load-another-joke-button');

      fireEvent.click(button);

      expect(props.onLoadAnotherJoke).toHaveBeenCalledTimes(1);
    });
  });

  describe('when user selects a category', () => {
    it('should invoke onSelectCategory with selected category', () => {
      const { getByTestId } = render(<Joke {...props} />);

      expect(props.onSelectCategory).not.toHaveBeenCalled();

      const dropdownButton = getByTestId('category-dropdown').children[0];
      act(() => {
        fireEvent.click(dropdownButton);
      });

      const dropdownItem = getByTestId('category-dropdown-item-art');
      fireEvent.click(dropdownItem);

      expect(props.onSelectCategory).toHaveBeenCalledTimes(1);
      expect(props.onSelectCategory).toHaveBeenCalledWith('art');
    });
  });
});
