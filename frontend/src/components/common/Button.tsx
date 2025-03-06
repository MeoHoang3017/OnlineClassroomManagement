import { ReactNode } from "react";

// Button Component
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ children, onClick, variant = "primary" }: ButtonProps) => {
    const baseStyle = "px-4 py-2 rounded text-white focus:outline-none";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600",
        secondary: "bg-gray-500 hover:bg-gray-600",
        danger: "bg-red-500 hover:bg-red-600",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};