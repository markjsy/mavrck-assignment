import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../reducers';
import { createLogger } from 'redux-logger';
import SearchBar from './SearchBar';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { getOperationAST } from 'graphql';
import { WebSocketLink } from '@apollo/client/link/ws';
import { CONFIG } from '../../all-configs/config';
import { getByTestId, queryByAttribute, getByText, render, screen, getByLabelText, fireEvent } from '@testing-library/react';
import { domain } from 'process';
import userEvent from '@testing-library/user-event';

test('Simple test for searchbar component', () => {
    const dom = render(<SearchBar options={[]} />);

    const searchDiv = dom.container.querySelector('#text-field-search-label');
    const searchText = dom.container.querySelector('#text-field-search-label')?.textContent;

    // Looks for search bar id
    expect(searchDiv).toBeInTheDocument();

    // Checks for the "Search" label inside the search bar
    expect(searchText).toBe('Search');
});

test('Simple test for entering a value on searchbar component', () => {
    const { container } = render(<SearchBar options={[]} />);
    const field = container.querySelector('#text-field-search')
    
    if (field !== null) {
        fireEvent.change(field, { target: { value: 'abcd@xyz.com' } });
        const fieldValue = container.querySelector('#text-field-search')?.getAttribute("value")
        expect(fieldValue).toBe("abcd@xyz.com")
    }
});
