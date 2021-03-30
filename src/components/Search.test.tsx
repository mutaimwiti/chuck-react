import React from 'react';
import debounce from 'lodash.debounce';
import { fireEvent, render } from '@testing-library/react';

import Search, { SearchProps } from './Search';

jest.mock('lodash.debounce');

describe('Search', function () {
  let props: SearchProps;

  beforeEach(() => {
    // @ts-ignore
    debounce.mockImplementation((fnToRun) => {
      return () => fnToRun();
    });

    props = {
      results: {
        isLoading: false,
        items: [
          {
            icon_url: 'icon/url',
            id: 'someJokeId',
            url: 'joke/url',
            value: 'This is a joke',
          },
          {
            icon_url: 'icon/url',
            id: 'someOtherJokeId',
            url: 'joke/url',
            value: 'This is another joke',
          },
        ],
      },
      onSearch: jest.fn(),
      onClearSearch: jest.fn(),
    };
  });

  it('should not blow up', () => {
    expect(() => render(<Search {...props} />)).not.toThrow();
  });

  it('should match snapshot', () => {
    const { container } = render(<Search {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display jokes', () => {
    const { getByText } = render(<Search {...props} />);

    expect(getByText('This is a joke')).toBeInTheDocument();
    expect(getByText('This is another joke')).toBeInTheDocument();
  });

  describe('when search query is typed in', () => {
    describe('and it is less than 3 characters', () => {
      it('should show tip and invoke onClearSearch', () => {
        const { getByTestId, getByText } = render(<Search {...props} />);

        expect(props.onClearSearch).not.toHaveBeenCalled();

        const input = getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'fo' } });

        expect(props.onClearSearch).toHaveBeenCalledTimes(1);

        expect(getByText('Your search phrase must be 3 characters or longer'));
      });
    });

    describe('and it more than 2 characters', () => {
      it('should show invoke onSearch with query', () => {
        const { getByTestId } = render(<Search {...props} />);

        const input = getByTestId('search-input');

        expect(props.onSearch).not.toHaveBeenCalled();

        fireEvent.change(input, { target: { value: 'foo' } });

        expect(props.onSearch).toHaveBeenCalledTimes(1);
        expect(props.onSearch).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('when it is loading jokes', () => {
    it('should show loading message', () => {
      const propsCopy = props;

      propsCopy.results.isLoading = true;

      const { getByText } = render(<Search {...propsCopy} />);

      expect(getByText('Your search phrase must be 3 characters or longer'));
    });
  });

  describe('when there are no results', () => {
    it('should show no results to display message', () => {
      const propsCopy = props;

      propsCopy.results.items = [];
      propsCopy.results.isLoading = false;

      const { getByText, getByTestId } = render(<Search {...propsCopy} />);

      const input = getByTestId('search-input');

      fireEvent.change(input, { target: { value: 'foo' } });

      expect(getByText('No results to display'));
    });
  });

  describe('when clear button is clicked', () => {
    it('should invoke onClearSearch', () => {
      const { getByText } = render(<Search {...props} />);

      expect(props.onClearSearch).not.toHaveBeenCalled();

      const input = getByText('Clear');
      fireEvent.click(input);

      expect(props.onClearSearch).toHaveBeenCalledTimes(1);
    });
  });
});
