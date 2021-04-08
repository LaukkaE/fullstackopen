import React from 'react';

function Filter(props) {
    return (
        <div>
            filter shown with
            <input
                onChange={(event) => props.setFilter(event.target.value)}
                value={props.filter}
            />
        </div>
    );
}

export default Filter;
