import { ReactNode } from "react";

// Button Component
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "success";
}

export const Button = ({ children, onClick, variant = "primary" }: ButtonProps) => {
    const baseStyle = "px-4 py-2 rounded text-white focus:outline-none transition-colors duration-300 cursor-pointer";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-700",
        secondary: "bg-gray-500 hover:bg-gray-700",
        danger: "bg-red-500 hover:bg-red-700",
        success: "bg-green-500 hover:bg-green-700",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

