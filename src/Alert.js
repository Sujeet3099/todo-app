import React from 'react';

const Alert = ({ show, removeAlert }) => {
    const { msg, type } = show;
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            removeAlert(false);
        }, 3000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [removeAlert]);
    return (
        <div className={`alert alert-${type}`}>
            <p>{msg}</p>
        </div>
    );
};

export default Alert;
