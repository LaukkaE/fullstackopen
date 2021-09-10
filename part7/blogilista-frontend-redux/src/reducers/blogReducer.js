/* eslint-disable indent */
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export const voteBlog = (blog) => {
    return async (dispatch) => {
        const newBlogObj = {
            likes: blog.likes + 1,
            id: blog.id,
            comments: blog.comments,
        };
        const updatedBlog = await blogService.updateBlog(blog.id, newBlogObj);
        dispatch({
            type: 'VOTE',
            data: updatedBlog,
        });
    };
};

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        const newBlogObj = {
            comments: [...blog.comments, comment],
            id: blog.id,
            likes: blog.likes,
        };
        const updatedBlog = await blogService.updateBlog(blog.id, newBlogObj);
        dispatch({
            type: 'ADD_COMMENT',
            data: updatedBlog,
        });
    };
};
// const handleBlogAddComment = async (blog, comment) => {
//     const newBlogObj = {
//         comments: [...blog.comments, comment],
//         id: blog.id,
//     };
//     const updatedBlog = await blogService.updateBlog(blog.id, newBlogObj);
//     console.log(updatedBlog);
//     // dispatch(voteBlog(blog));
// };
export const addBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.createBlog(blog);
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog,
            });
            dispatch(
                setNotification(
                    `A new blog ${newBlog.title} by ${newBlog.author} added`,
                    5
                )
            );
        } catch (exception) {
            dispatch(setNotification('Blog creation failed', 5));
        }
    };
};
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        });
    };
};
export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(blog.id);
            dispatch({
                type: 'DELETE_BLOG',
                data: blog,
            });
            dispatch(setNotification(`Blog: ${blog.title} removed`, 5));
        } catch (error) {
            dispatch(setNotification('Blog delete failed', 5));
        }
    };
};

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data];
        case 'INIT_BLOGS':
            return action.data;
        case 'DELETE_BLOG':
            return state.filter((element) => {
                return element.id !== action.data.id;
            });
        case 'VOTE':
            return state.map((element) => {
                return element.id !== action.data.id ? element : action.data;
            });
        case 'ADD_COMMENT':
            return state.map((element) => {
                return element.id !== action.data.id ? element : action.data;
            });
        default:
            return state;
    }
};

export default blogReducer;
