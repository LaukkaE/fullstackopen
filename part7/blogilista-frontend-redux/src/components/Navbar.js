import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
    const store = useSelector((state) => state);
    // const linkStyle = {
    //     textDecoration: 'none',
    // };

    return (
        <div>
            <AppBar variant="elevation" position="static" color="secondary">
                <Toolbar>
                    <Typography>
                        <Link
                            style={{
                                color: '#222',
                                fontWeight: 'bold',
                                paddingRight: '5px',
                                textDecoration: 'none',
                            }}
                            component={RouterLink}
                            to={'/'}
                        >
                            blogs
                        </Link>
                    </Typography>
                    <Typography>
                        <Link
                            style={{
                                color: '#222',
                                fontWeight: 'bold',
                                paddingRight: '5px',
                                textDecoration: 'none',
                            }}
                            component={RouterLink}
                            to={'/users'}
                        >
                            users
                        </Link>
                    </Typography>
                    <Typography style={{ marginLeft: '30px' }}>
                        {`${store.user.name} logged in`}
                    </Typography>
                    <Button
                        style={{ marginLeft: '50px' }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogout()}
                    >
                        logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
