import {Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState, MouseEvent} from "react";

import {JokeState, SearchState} from "../store/reducers/joke";

type SearchProps = {
    results: SearchState,
    onSearch(phrase: string): void,
    onClearSearch(): void,
}

const Search: React.FC<SearchProps> = ({results, onSearch, onClearSearch}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        setQuery('');
        onClearSearch();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Search more jokes</b></Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Enter search query e.g. Food"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={handleClear}>Clear</Button>
                        </InputGroup.Append>
                    </InputGroup>

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
