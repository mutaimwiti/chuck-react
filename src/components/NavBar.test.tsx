import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import NavBar, { NavBarProps } from './NavBar';

describe('NavBar', function () {
  let props: NavBarProps;

  beforeEach(() => {
    props = {
      onGoHome: jest.fn(),
    };
  });

  it('should not blow up', () => {
    expect(() => render(<NavBar {...props} />)).not.toThrow();
  });

  it('should match snapshot', () => {
    const { container } = render(<NavBar {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('when user clicks home', () => {
    it('should invoke onGoHome', () => {
      const { getByText } = render(<NavBar {...props} />);

      expect(props.onGoHome).not.toHaveBeenCalled();

      fireEvent.click(getByText('Chuck React'));

      expect(props.onGoHome).toHaveBeenCalledTimes(1);
    });
  });
});
