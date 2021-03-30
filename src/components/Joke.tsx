import React, {MouseEvent} from "react";
import styled from "styled-components";
import {Button, Card, DropdownButton, Dropdown} from "react-bootstrap";

import {JokeState} from "../store/reducers/joke";
import {CategoriesState} from "../store/reducers/categories";

type JokeProps = {
    category: string,
    joke: JokeState,
    onLoadAnotherJoke(): void,
    categories: CategoriesState,
    onSelectCategory(category: string): void,
}

const StyledCard = styled(Card)`
  border: none;
`

const Joke: React.FC<JokeProps> = ({category, joke, onLoadAnotherJoke, categories, onSelectCategory}) => {
    const handleLoadAnotherJoke = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        onLoadAnotherJoke();
    };

    const handleSelectCategory = (event: MouseEvent<HTMLButtonElement>, category: string) => {
        event.currentTarget.blur();
        onSelectCategory(category);
    }

    return <>
        {
            joke && <StyledCard>
                <Card.Body>
                    <Card.Title>
                        <DropdownButton id="dropdown-basic-button" title={category}>
                            {categories.map((category: string) => (
                                <Dropdown.Item
                                    key={category}
                                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                        handleSelectCategory(event, category)
                                    }}
                                >
                                    {category}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Card.Title>
                    <Card.Text>{joke.value}</Card.Text>
                    <Button variant="outline-secondary" onClick={handleLoadAnotherJoke}>
                        Another one
                    </Button>
                </Card.Body>
            </StyledCard>
        }
    </>
}

export default Joke;
