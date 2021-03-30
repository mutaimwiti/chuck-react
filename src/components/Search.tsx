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

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Search more jokes</b></Form.Label>
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Enter search query e.g. Food"
                    />
                </Form.Group>
            </Form>
            <br/>
            <ListGroup>
                {results.map((joke: JokeState) => (<ListGroup.Item key={joke.id}>{joke.value}</ListGroup.Item>))}
            </ListGroup>
        </>
    );
}

export default Search;
