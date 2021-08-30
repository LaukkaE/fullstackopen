const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification;
        case 'CLEAR_NOTIFICATION':
            return '';
        default:
            return state;
    }
};

let timer = null;

export const setNotification = (notification, timeout) => {
    return async (dispatch) => {
        const dispatchObj = {
            type: 'SET_NOTIFICATION',
            notification,
        };
        await dispatch(dispatchObj);
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch(clearNotification());
        }, timeout * 1000);
    };
};

export const clearNotification = () => {
    return { type: 'CLEAR_NOTIFICATION' };
};

export default notificationReducer;
