import React from "react";

import {JokeState} from "../store/reducers/joke";

type JokeProps = {
    joke: JokeState,
}

const Joke: React.FC<JokeProps> = ({joke}) => {
    return <>{joke && joke.value}</>;
};

export default Joke;
