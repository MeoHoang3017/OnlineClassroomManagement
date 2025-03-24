import { useContext } from "react";
import NotyfContext from "../contexts/NotyfContext";

const useNotification = () => {
    const notyf = useContext(NotyfContext);

    const showSuccessMessage = (message: string) => {
        notyf.open({
            type: "success",
            message: message,
            duration: 1500,
            ripple: true,
            dismissible: false,
            position: {
                x: "right",
                y: "top",
            },
        });
    };

    const showErrorMessage = (message: string) => {
        notyf.open({
            type: "danger",
            message: message,
            duration: 1500,
            ripple: true,
            dismissible: false,
            position: {
                x: "right",
                y: "top",
            },
        });
    };

    const showInfoMessage = (message: string) => {
        notyf.open({
            type: "info",
            message: message,
            duration: 1500,
            ripple: true,
            dismissible: false,
            position: {
                x: "right",
                y: "top",
            },
        });
    }

    return [showSuccessMessage, showErrorMessage, showInfoMessage];
};

export default useNotification;
