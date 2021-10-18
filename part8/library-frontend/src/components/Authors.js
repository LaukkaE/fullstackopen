import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, GET_AUTHORS } from '../utils/queries';
import Select from 'react-select';

const Authors = (props) => {
    const result = useQuery(GET_AUTHORS);
    const [selectedOption, setSelectedOption] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [birthYear, setBirthYear] = useState('');
    const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (!result.loading)
            setAuthors(
                result.data.allAuthors.map((author) => {
                    return { value: author.name, label: author.name };
                })
            );
    }, [result]);

    const handleBirthYearUpdate = () => {
        changeBirthYear({
            variables: { name: selectedOption.value, setBornTo: birthYear },
        });
    };

    if (!props.show) {
        return null;
    }
    if (result.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {props.token && (
                <>
                    <h2>Set birthyear</h2>
                    <div>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={authors}
                        />
                        born
                        <input
                            type="number"
                            onChange={({ target }) =>
                                setBirthYear(parseInt(target.value))
                            }
                            value={birthYear}
                        />
                        <br />
                        <button
                            disabled={!birthYear}
                            onClick={handleBirthYearUpdate}
                        >
                            update author
                        </button>
                    </div>{' '}
                </>
            )}
        </div>
    );
};

export default Authors;
