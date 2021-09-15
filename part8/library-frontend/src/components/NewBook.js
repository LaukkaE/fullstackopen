import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../utils/queries';

const NewBook = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    // const [addBook] = useMutation(ADD_BOOK, {
    //     // refetchQueries: [{ query: ALL_PERSONS }],
    //     onError: (error) => {
    //         console.log(error.graphQLErrors[0].message);
    //         // setError(error.graphQLErrors[0].message);
    //     },
    // });
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });
    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();
        addBook({ variables: { title, author, published, genres } });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) =>
                            setPublished(parseInt(target.value))
                        }
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} disabled={!genre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button
                    // Kaikki fieldit pitää olla täytettynä, että voidaan painaa create book nappulaa
                    disabled={
                        !title || !author || !published || genres.length === 0
                    }
                    type="submit"
                >
                    create book
                </button>
            </form>
        </div>
    );
};

export default NewBook;
