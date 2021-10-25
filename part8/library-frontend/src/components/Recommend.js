import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_FAVORITE_GENRE, GET_BOOKS } from '../utils/queries';

const Recommend = (props) => {
    const {
        data: favoriteGenre,
        loading,
        refetch,
    } = useQuery(GET_FAVORITE_GENRE);

    const {
        data,
        loading: loading2,
        refetch: refetch2,
    } = useQuery(GET_BOOKS, {
        skip: !favoriteGenre,
        variables: {
            selectedGenre: favoriteGenre?.me?.favoriteGenre,
        },
    });
    // Tämä oksennus nyt oli nopea ratkaisu siihen, ettei recommend page räjähdä kun relogataan samassa sessiossa. Tätä voisi kyllä parantaa mutta toiminee.
    useEffect(() => {
        refetch();
        refetch2();
    }, [props.token, refetch, refetch2, favoriteGenre]);

    if (!props.show) {
        return null;
    }
    if (loading || loading2) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {/* <button onClick={() => console.log(favoriteGenre)}>asd</button> */}
            <h2>recommendations</h2>
            <h4>
                books in your favorite genre: {favoriteGenre?.me?.favoriteGenre}
            </h4>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {data?.allBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommend;
