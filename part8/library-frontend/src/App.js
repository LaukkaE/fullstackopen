import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { useApolloClient } from '@apollo/client';
import Recommend from './components/Recommend';

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

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
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

            <Recommend show={page === 'recommend'} />

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
