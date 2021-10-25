import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { useApolloClient, useSubscription } from '@apollo/client';
import Recommend from './components/Recommend';
import { BOOK_ADDED, GET_BOOKS } from './utils/queries';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const client = useApolloClient();

    const setError = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };
    const updateCacheWith = (addedBook) => {
        console.log('updatecachewith');
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id);

        const dataInStore = client.readQuery({ query: GET_BOOKS });
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: GET_BOOKS,
                data: {
                    allBooks: dataInStore.allBooks.concat(addedBook),
                },
            });
        }
    };

    useEffect(() => {
        const savedToken = window.localStorage.getItem('booklibrary-token');
        if (savedToken) setToken(savedToken);
    }, []);

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;

            window.alert(`${addedBook.title} added`);

            updateCacheWith(addedBook);
        },
    });

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
        setPage('authors');
    };

    return (
        <div>
            <h2 style={{ color: 'red' }}>{errorMessage}</h2>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>
                            recommend
                        </button>
                        <button onClick={() => logout()}>logout</button>
                    </>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors
                show={page === 'authors'}
                setError={setError}
                token={token}
            />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} setError={setError} />

            {token && <Recommend show={page === 'recommend'} token={token} />}

            <Login
                show={page === 'login'}
                setToken={setToken}
                setError={setError}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
