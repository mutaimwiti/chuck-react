import debounce from 'lodash.debounce';
import React, {ChangeEvent, useState, MouseEvent} from "react";
import {Button, Form, InputGroup, ListGroup} from "react-bootstrap";

import {JokeState, SearchState} from "../store/reducers/joke";

type SearchProps = {
    results: SearchState,
    onSearch(phrase: string): void,
    onClearSearch(): void,
}

const Search: React.FC<SearchProps> = ({results, onSearch, onClearSearch}) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setQuery(value);

        // search phrase should be a minimum of 3 three characters
        if (value.length >= 3) {
            const debouncedSearch = debounce(() => onSearch(value), 300);
            debouncedSearch();
        } else {
            onClearSearch();
        }
    }

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        setQuery('');
        onClearSearch();
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label><b>Search more jokes</b></Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Enter your search phrase e.g. food"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={handleClear}>Clear</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Text muted>
                        Your search phrase must be 3 characters or longer
                    </Form.Text>

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
