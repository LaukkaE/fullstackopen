import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
    const store = useSelector((state) => state);

    return (
        <div style={{ display: 'inline' }}>
            <Link to={'/'}>blogs</Link> <Link to={'/users'}>users</Link>
            {` ${store.user.name} logged in`}
            <button onClick={() => handleLogout()}>logout</button>
        </div>
    );
};

export default Navbar;
