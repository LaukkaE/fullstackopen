import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import { CreateBlog } from './components/CreateBlog';
import { Login } from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const blogFormRef = useRef();

    const debug = (e) => {
        e.preventDefault();
        console.log(blogs[0], user);
    };
    const getData = async () => {
        const response = await blogService.getAll();
        response.sort((a, b) => b.likes - a.likes);
        setBlogs(response);
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);

            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(null);
    };

    const handleBlogCreate = async (newBlog) => {
        try {
            const blogResponse = await blogService.createBlog(
                newBlog
                // user.token
            );
            blogFormRef.current.toggleVisibility();
            setMessage(
                `A new blog ${newBlog.title} by ${newBlog.author} added`
            );
            setBlogs([...blogs, blogResponse]);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        } catch (exception) {
            console.log(exception);
            setErrorMessage('Creating a blog failed');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleLogin = async (loginObject) => {
        try {
            const user = await loginService.login(loginObject);
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            );
            setUser(user);
        } catch (exception) {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    if (user === null) {
        return <Login handleLogin={handleLogin} errorMessage={errorMessage} />;
    }

    return (
        <div>
            <button onClick={debug}>debugbutton</button>
            <h2>blogs</h2>
            <h1>{errorMessage}</h1>
            <h1>{message}</h1>
            <p>
                Logged in as :{user.name}{' '}
                <button onClick={handleLogout}>Logout</button>
            </p>
            <Togglable buttonLabel="create blog" ref={blogFormRef}>
                <CreateBlog handleBlogCreate={handleBlogCreate} user={user} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} getData={getData} />
            ))}
        </div>
    );
};

export default App;
