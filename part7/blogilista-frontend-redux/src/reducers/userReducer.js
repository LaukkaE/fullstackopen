/* eslint-disable indent */
import { setNotification } from './notificationReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

export const cookieLogin = (user) => {
    return async (dispatch) => {
        const userObj = JSON.parse(user);
        blogService.setToken(userObj.token);
        dispatch({
            type: 'LOGIN',
            data: userObj,
        });
    };
};

export const userLogin = (userCredentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(userCredentials);
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            );
            dispatch({
                type: 'LOGIN',
                data: user,
            });
        } catch (e) {
            dispatch(setNotification('Wrong credentials', 5));
        }
    };
};
export const userLogout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGOUT',
        });
    };
};

export default userReducer;
