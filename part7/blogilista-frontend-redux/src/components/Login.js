import { TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Login = (props) => {
    const notification = useSelector((state) => state.notification);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        const loginObject = {
            username: username,
            password: password,
        };
        props.handleLogin(loginObject);
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <Typography color="textPrimary" variant="h5">
                Log in to application
                <br />
                {notification}
            </Typography>
            <form onSubmit={login}>
                <TextField
                    color="secondary"
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    label="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <br />
                <TextField
                    color="secondary"
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    label="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                <Button
                    style={{ marginLeft: '20px' }}
                    color="primary"
                    variant="contained"
                    id="login-button"
                    type="submit"
                >
                    login
                </Button>
            </form>
        </div>
    );
};
