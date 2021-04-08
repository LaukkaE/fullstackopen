import React from 'react';
import './Notification.css';

function ErrorNotification({ errorMessage }) {
    if (errorMessage === null) {
        return null;
    }
    return (
        <div>
            <div className="error">{errorMessage}</div>
        </div>
    );
}

export default ErrorNotification;
