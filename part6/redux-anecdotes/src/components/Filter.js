import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        // dispatch(setFilter(event.target.value));
        props.setFilter(event.target.value);
    };
    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    );
};

const connectedFilter = connect(null, { setFilter })(Filter);
export default connectedFilter;
