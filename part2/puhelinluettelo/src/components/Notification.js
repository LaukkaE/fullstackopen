import React from 'react';
import './Notification.css';

function Notification({ message}) {
    if (message === null) {
        return null;
    }
    return (
        <div>
            <div className="message">{message}</div>
        </div>
    );
}

export default Notification;
