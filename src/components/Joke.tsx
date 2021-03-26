import React from "react";
import {Card} from "react-bootstrap";
import styled from "styled-components";

import {JokeState} from "../store/reducers/joke";

type JokeProps = {
    category: string,
    joke: JokeState,
}

const StyledCard = styled(Card)`
  border: none;
`

const Joke: React.FC<JokeProps> = ({category, joke}) => {
    return <>
        {
            joke && <StyledCard>
                <Card.Body>
                    <Card.Title>{category}</Card.Title>
                    <Card.Text>{joke.value}</Card.Text>
                </Card.Body>
            </StyledCard>
        }
    </>
}

export default Joke;
