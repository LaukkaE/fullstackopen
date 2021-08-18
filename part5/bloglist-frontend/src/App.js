import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import { CreateBlog } from './components/CreateBlog';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const blogFormRef = useRef();

    const getData = () => {
        blogService.getAll().then((response) => {
            setBlogs(response);
        });
    };

    const debug = (e) => {
        e.preventDefault();
        console.log(user);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            console.log(user);

            setUser(user);
            // noteService.setToken(user.token)
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(null);
    };
    const handleBlogCreate = async (e) => {
        e.preventDefault();
        const blog = {
            url: url,
            title: title,
            likes: 0,
            author: author,
            user: user.userID,
        };
        try {
            const blogResponse = await blogService.createBlog(blog, user.token);
            blogFormRef.current.toggleVisibility();
            console.log(blogResponse);
            setMessage(`A new blog ${title} by ${author} added`);
            setUrl('');
            setTitle('');
            setAuthor('');
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
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            );
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                {errorMessage}
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
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
                <CreateBlog
                    title={title}
                    url={url}
                    setUrl={setUrl}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    handleBlogCreate={handleBlogCreate}
                />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
