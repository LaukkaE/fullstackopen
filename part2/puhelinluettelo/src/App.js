import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import bookService from './services/PhoneBook';
import { nanoid } from 'nanoid';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        bookService.getAll().then((response) => {
            console.log('getData', response);
            setPersons(response);
        });
    };
    const addNumber = (event) => {
        const numberObject = {
            name: newName,
            //käytetään ID:nä npm packagea nanoid joka luo random ID:n
            id: nanoid(),
            number: newNumber,
        };
        if (persons.find((person) => person.name === newName)) {
            const indexOfPerson = persons.find(
                (person) => person.name === newName
            );
            event.preventDefault();
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                console.log(indexOfPerson);
                bookService.update(indexOfPerson.id, numberObject).then(() => {
                    getData();
                    setNotificationMessage(`Updated ${numberObject.name}`);
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
                });
            }
            setNewName('');
            setNewNumber('');
        } else {
            event.preventDefault();

            bookService.create(numberObject).then((response) => {
                setPersons(persons.concat(numberObject));
                setNewName('');
                setNewNumber('');
                setNotificationMessage(`Added ${numberObject.name}`);
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);
            });
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <ErrorNotification errorMessage={errorMessage} />
            <Filter filter={filterName} setFilter={setFilterName} />
            <h2>add a new</h2>
            <PersonForm
                addNumber={addNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filterName}
                getData={getData}
                setMessage={setNotificationMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
};

export default App;
