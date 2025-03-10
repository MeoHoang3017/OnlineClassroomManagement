import { ReactNode } from "react";

// Button Component
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "success";
}

export const Button = ({ children, onClick, variant = "primary" }: ButtonProps) => {
    const baseStyle = "px-4 py-2 rounded focus:outline-none transition-colors duration-300 cursor-pointer";
    const variants = {
        primary: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
        secondary: "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
        danger: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        success: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

