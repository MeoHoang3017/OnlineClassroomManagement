import { ReactNode, CSSProperties } from "react";

// Button Component Props
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "success";
    loading?: boolean; // Adds a loading prop
    disabled?: boolean; // Optional additional disable prop
    style?: CSSProperties; // Accept inline style
    className?: string; // Accept custom class names
}

export const Button = ({
    children,
    onClick,
    variant = "primary",
    loading = false, // Default to not loading
    disabled = false, // Default to not disabled
    style = {}, // Default to an empty object
    className = "", // Default to an empty string
}: ButtonProps) => {
    const baseStyle =
        "px-4 py-2 rounded focus:outline-none transition-colors duration-300 cursor-pointer";
    const variants = {
        primary:
            "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
        secondary:
            "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
        danger:
            "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        success:
            "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    };

    const isDisabled = loading || disabled; // Combine loading and disabled states
    const disableStyle = "opacity-50 cursor-not-allowed"; // Styles for disabled state

    return (
        <button
            style={style} // Apply inline styles
            className={`${baseStyle} ${isDisabled ? disableStyle : variants[variant]} ${className}`} // Combine base, variant, disabled, and custom class names
            onClick={!isDisabled ? onClick : undefined} // Prevent clicks during loading/disabled
            disabled={isDisabled} // Disable button
        >
            {loading ? "Loading..." : children}
        </button>
    );
};
