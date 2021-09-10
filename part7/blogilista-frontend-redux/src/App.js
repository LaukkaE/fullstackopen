import React, { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import { Login } from './components/Login';
import Togglable from './components/Togglable';
// import blogService from './services/blogs';
// import loginService from './services/login';
import userService from './services/users';
import { useSelector, useDispatch } from 'react-redux';
import { addBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer';
import { cookieLogin, userLogin, userLogout } from './reducers/userReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Navbar from './components/Navbar';
import BlogDetails from './components/BlogDetails';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, Typography } from '@material-ui/core';
import './app.css';
const App = () => {
    const theme = createTheme({
        palette: {
            background: {
                default: '#282c34',
            },
            type: 'dark',
        },
    });
    const [userList, setUserList] = useState([]);

    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getUsers();
            setUserList(users);
        };
        getUsers();
    }, [store]);

    const blogFormRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            dispatch(cookieLogin(loggedUserJSON));
            // const user = JSON.parse(loggedUserJSON);
            // blogService.setToken(user.token);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.clear();
        dispatch(userLogout());
    };

    const handleBlogRemove = async (blog) => {
        if (
            window.confirm(
                `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
            )
        ) {
            dispatch(deleteBlog(blog));
        }
    };

    const handleBlogCreate = async (newBlog) => {
        dispatch(addBlog(newBlog));
        blogFormRef.current.toggleVisibility();
    };

    const handleLogin = async (loginObject) => {
        dispatch(userLogin(loginObject));
    };

    if (!store.user) {
        return (
            <ThemeProvider theme={theme}>
                <Login handleLogin={handleLogin} />{' '}
            </ThemeProvider>
        );
    }

    return (
        <Router>
            <div>
                <ThemeProvider theme={theme}>
                    <Navbar handleLogout={handleLogout} />
                    <Typography variant="h4" color="textPrimary">
                        blog app
                        <br />
                        {store.notification}
                    </Typography>
                    <Switch>
                        <Route path="/blogs/:id">
                            <BlogDetails handleBlogRemove={handleBlogRemove} />
                        </Route>
                        <Route path="/users/:id">
                            <User userList={userList} />
                        </Route>
                        <Route path="/users">
                            <Users userList={userList} />
                        </Route>
                        <Route path="/">
                            <Togglable
                                buttonLabel="create blog"
                                ref={blogFormRef}
                            >
                                <CreateBlog
                                    handleBlogCreate={handleBlogCreate}
                                    user={store.user}
                                />
                            </Togglable>
                            {store.blogs
                                .sort((a, b) => b.likes - a.likes) // Storen sorttaus runtimessä ei liene paras ratkaisu mutta toiminee, ellei datan määrä ole iso.
                                .map((blog) => (
                                    <Blog
                                        key={blog.id}
                                        blog={blog}
                                        user={store.user}
                                        // handleAddLike={() => handleBlogAddLike(blog)}
                                        handleRemove={() =>
                                            handleBlogRemove(blog)
                                        }
                                    />
                                ))}
                        </Route>
                    </Switch>
                </ThemeProvider>
            </div>
        </Router>
    );
};

export default App;
