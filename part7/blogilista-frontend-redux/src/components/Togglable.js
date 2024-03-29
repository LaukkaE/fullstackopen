import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {
        display: visible ? 'none' : '',
        marginBottom: '5px',
    };
    const showWhenVisible = {
        display: visible ? '' : 'none',
        marginBottom: '5px',
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={toggleVisibility}
                >
                    cancel
                </Button>
            </div>
        </div>
    );
});
Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
