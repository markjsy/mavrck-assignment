import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../reducers';
import { createLogger } from 'redux-logger';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import { getOperationAST } from 'graphql';
import { WebSocketLink } from '@apollo/client/link/ws';
import { CONFIG } from '../../all-configs/config';
import { getByTestId, queryByAttribute, getByText, render, screen } from '@testing-library/react';

test('Simple test for App page', () => {
    const link = ApolloLink.split(
        (operation) => {
            const operationAST = getOperationAST(operation.query, operation.operationName);
            return !!operationAST && operationAST.operation === 'subscription';
        },
        new WebSocketLink({
            uri: CONFIG.REACT_REDUX_UI.GRAPHQL_SUB_URL,
            options: {
                reconnect: true
            }
        })
    );
    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    });

    const loggerMiddleware = createLogger();
    const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
    const dom = render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    );
    const rootDiv = dom.container.querySelector('.App');
    expect(rootDiv).toBeInTheDocument();
});
