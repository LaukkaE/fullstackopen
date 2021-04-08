import React from 'react';

function Filter({ filter, setFilter, eventHandler }) {
    return (
        <div>
            find countries
            <input onChange={(event) => eventHandler(event)} value={filter} />
        </div>
    );
}

export default Filter;
