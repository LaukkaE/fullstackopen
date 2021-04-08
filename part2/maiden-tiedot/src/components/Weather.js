import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Weather({ capital }) {
    const [weather, setWeather] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    //api key pitää antaa käynnistettäessä
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        console.log('axios get weather');
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
            )
            .then((response) => {
                setError(false);
                console.log('weather data');
                console.log(response);
                if (response.data.success !== false) {
                    setWeather(response.data);
                } else {
                    console.log('fetch failed');
                    setError(true);
                }
                setIsLoading(false);
            });
    }, [capital, api_key]);

    //ei yritä renderöidä dataa, ennenkuin se on haettu
    if (isLoading) {
        return <div>Loading...</div>;
    }

    //API:n syöttämän errorin voisi myös renderöidä ruudulle, mutta jätetään se tekemättä ja sensijaan laitetaan vain geneerinen errormessage, jos datan saaminen ei onnistu
    if (error) {
        return (
            <div>Weather data fetch failed, possibly given invalid API key</div>
        );
    }
    return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weather.current.temperature} celsius</p>
                <img src={weather.current.weather_icons} alt="weather" />
                <p>
                    wind: {weather.current.wind_speed} mph direction:{' '}
                    {weather.current.wind_dir}
                </p>
            </div>
    );
}
