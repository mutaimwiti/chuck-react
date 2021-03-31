import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Dropdown,
  Spinner,
  DropdownButton,
} from 'react-bootstrap';

import { JokeState } from '../store/reducers/joke';
import { CategoriesState } from '../store/reducers/categories';

export type JokeProps = {
  category: string;
  joke: JokeState | null;
  onLoadAnotherJoke(): void;
  categories: CategoriesState;
  onSelectCategory(category: string): void;
};

const StyledCard = styled(Card)`
  border: none;
`;

const Joke: React.FC<JokeProps> = ({
  category,
  joke,
  onLoadAnotherJoke,
  categories,
  onSelectCategory,
}) => {
  const handleLoadAnotherJoke = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    onLoadAnotherJoke();
  };

  const handleSelectCategory = (
    event: MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    event.currentTarget.blur();
    onSelectCategory(category);
  };

  return (
    <>
      <StyledCard>
        <Card.Body>
          {joke ? (
            <>
              <Card.Title>
                {category && (
                  <DropdownButton
                    data-testid="category-dropdown"
                    title={category}
                  >
                    {categories.map((category: string) => (
                      <Dropdown.Item
                        key={category}
                        data-testid={`category-dropdown-item-${category}`}
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                          handleSelectCategory(event, category);
                        }}
                      >
                        {category}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                )}
              </Card.Title>
              <Card.Text>{joke.value}</Card.Text>
              <Button
                variant="outline-secondary"
                onClick={handleLoadAnotherJoke}
                data-testid="load-another-joke-button"
              >
                Another <b>{category}</b> joke
              </Button>
            </>
          ) : (
            <Spinner animation="border" data-testid="joke-spinner" />
          )}
        </Card.Body>
      </StyledCard>
    </>
  );
};

export default Joke;
