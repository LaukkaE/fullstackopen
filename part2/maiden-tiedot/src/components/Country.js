import React, { useState} from 'react';
import Weather from './Weather';


export default function Country(props) {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div>
            {isOpen ? (
                <div>
                    <h1>{props.country}</h1>
                    <p>capital {props.capital}</p>
                    <p>population {props.population}</p>
                    <h2>languages</h2>
                    <ul>
                        {props.languages.map((language, index) => (
                            // indexin käyttö keynä ei liene yleensä hyvä idea, mutta toiminee tässä
                            <li key={index}>{language.name}</li>
                        ))}
                    </ul>
                    <img src={props.flag} width={100} alt={props.country} />
                    <Weather capital={props.capital} />
                </div>
            ) : (
                //Vaikka filtterin läpi tulisi vain yksi maa, jätin silti tämän open nappulan painettavaksi, koska maa-infon lataaminen saa aikaan API-callin sää-api:hin, ja sen ilmaisessa planissa oli vain 1000 api callia sallittu kuukaudessa, ja sovellusta rakennettaessa näitä calleja syntyi erittäin nopeaan tahtiin.
                <div>
                    <p>
                        {props.country}{' '}
                        <button onClick={() => setIsOpen(true)}>show</button>
                    </p>
                </div>
            )}
        </div>
    );
}
