import React from 'react';
import Country from './Country';

export default function CountryList({ filteredCountries }) {
    if (filteredCountries.length >= 10) {
        return <p>too many matches, specify another filter</p>;
    }

    return (
        <div>
            {filteredCountries.map((country, index) => (
                <Country
                    key={index}
                    country={country.name}
                    flag={country.flag}
                    capital={country.capital}
                    population={country.population}
                    languages={country.languages}
                />
            ))}
        </div>
    );
}
