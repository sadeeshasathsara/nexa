import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
    const notify = (message, type = "info", options = {}) => {
        switch (type) {
            case "success":
                toast.success(message, options);
                break;
            case "error":
                toast.error(message, options);
                break;
            case "warning":
                toast.warning(message, options);
                break;
            default:
                toast.info(message, options);
        }
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
