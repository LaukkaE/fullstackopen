import { useState } from 'react';

export const Login = (props) => {
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
            <h2>Log in to application</h2>
            {props.errorMessage}
            <form onSubmit={login}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    );
};
