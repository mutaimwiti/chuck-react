import {Form, ListGroup} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState} from "react";

import {JokeState, SearchState} from "../store/reducers/joke";

type SearchProps = {
    results: SearchState,
    onSearch(phrase: string): void,
}

const Search: React.FC<SearchProps> = ({results, onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Search" value={query} onChange={handleChange}/>
        <ListGroup>
            {results.map((joke: JokeState) => (<ListGroup.Item>{joke.value}</ListGroup.Item>))}
        </ListGroup>
    </Form>
}

export default Search;
