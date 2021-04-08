import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';

function App() {
    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    //API Urlit
    const COUNTRY_API_URL = 'https://restcountries.eu/rest/v2/all';

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setFilteredCountries(
            countries.filter((country) =>
                country.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            )
        );
    };

    useEffect(() => {
        console.log('axios get countries');
        axios.get(COUNTRY_API_URL).then((response) => {
            console.log('countries fetched');
            setCountries(response.data);
        });
    }, []);

    return (
        <div className="App">
            <Filter filter={filter} eventHandler={handleFilterChange} />

            {filteredCountries.length > 0 && (
                <CountryList filteredCountries={filteredCountries} />
            )}
        </div>
    );
}

export default App;
