import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_BOOKS, GET_GENRES } from '../utils/queries';

const Books = (props) => {
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all genres');
    // const result = useQuery(GET_BOOKS);
    const [getBooks, { loading, data }] = useLazyQuery(GET_BOOKS, {
        // fetchPolicy: 'no-cache',
    });
    //eslint-disable-next-line
    const genres = useQuery(GET_GENRES, {
        onCompleted: ({ allBooks }) => {
            let array = allBooks.map(({ genres }) => genres).flat();
            setGenreList([...new Set(array), 'all genres']);
        },
    });
    useEffect(() => {
        if (selectedGenre === 'all genres') {
            getBooks();
        } else {
            getBooks({ variables: { selectedGenre: selectedGenre } });
        }
    }, [selectedGenre, getBooks]);

    if (!props.show) {
        return null;
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {data.allBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>only show books of selected genre</h3>
            {genreList.map((genre, index) => {
                return (
                    <button key={index} onClick={() => setSelectedGenre(genre)}>
                        {genre}
                    </button>
                );
            })}
        </div>
    );
};

export default Books;
