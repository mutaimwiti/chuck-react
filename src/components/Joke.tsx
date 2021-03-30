import React, {MouseEvent} from "react";
import styled from "styled-components";
import {Button, Card} from "react-bootstrap";

import {JokeState} from "../store/reducers/joke";

type JokeProps = {
    category: string,
    joke: JokeState,
    onLoadAnotherJoke(): void,
}

const StyledCard = styled(Card)`
  border: none;
`

const Joke: React.FC<JokeProps> = ({category, joke, onLoadAnotherJoke}) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        onLoadAnotherJoke();
    };

    return <>
        {
            joke && <StyledCard>
                <Card.Body>
                    <Card.Title>{category}</Card.Title>
                    <Card.Text>{joke.value}</Card.Text>
                    <Button variant="primary" onClick={handleClick}>
                        Another one
                    </Button>
                </Card.Body>
            </StyledCard>
        }
    </>
}

export default Joke;
