// src/contexts/NotyfContext.jsx
import React, { PropsWithChildren } from "react";
import { Notyf } from "notyf";

const notyfInstance = new Notyf({
    duration: 5000,
    position: {
        x: "right",
        y: "top",
    },
    types: [
        {
            type: "default",
            backgroundColor: "#3B7DDD",
            icon: {
                className: "notyf__icon--success",
                tagName: "i",
            },
        },
        {
            type: "success",
            backgroundColor: "#28a745",
            icon: {
                className: "notyf__icon--success",
                tagName: "i",
            },
        },
        {
            type: "warning",
            backgroundColor: "#ffc107",
            icon: {
                className: "notyf__icon--error",
                tagName: "i",
            },
        },
        {
            type: "danger",
            backgroundColor: "#dc3545",
            icon: {
                className: "notyf__icon--error",
                tagName: "i",
            },
        },
        {
            type: "info",
            backgroundColor: "#17a2b8",
            icon: {
                tagName: "span",
                className: "notyf__icon--info",
            },
        },
    ],
});

const NotyfContext = React.createContext(notyfInstance);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const NotyfProvider = ({ children }: PropsWithChildren<{}>) => (
    <NotyfContext.Provider value={notyfInstance}>
        {children}
    </NotyfContext.Provider>
);

export default NotyfContext;
