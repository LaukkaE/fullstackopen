import React from 'react';
import bookService from '../services/PhoneBook';

function Persons(props) {
    const handleDelete = (person) => {
        console.log(person);
        if (window.confirm(`Delete ${person.name}?`)) {
            bookService
                .remove(person.id)
                .then(() => {
                    props.getData();
                    props.setMessage(`Deleted ${person.name}`);
                    setTimeout(() => {
                        props.setMessage(null);
                    }, 5000);
                })
                .catch((error) => {
                    props.setErrorMessage(
                        `Information of ${person.name} has already been removed from the server`
                    );
                    props.getData();
                    setTimeout(() => {
                        props.setErrorMessage(null);
                    }, 5000);
                });
        }
    };

    return (
        <div>
            <ul>
                {props.persons
                    .filter((person) =>
                        person.name
                            .toLowerCase()
                            .includes(props.filter.toLowerCase())
                    )
                    .map((person, i) => (
                        <li key={person.id}>
                            {person.name} {person.number}{' '}
                            <button onClick={() => handleDelete(person)}>
                                delete
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Persons;
