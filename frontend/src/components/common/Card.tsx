import React from "react";

interface CardProps {
    header: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ header, body, footer }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="p-4 bg-gray-100 border-b border-gray-200">
                {header}
            </div>
            {/* Body Section */}
            <div className="p-4">
                {body}
            </div>
            {/* Footer Section */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                {footer}
            </div>
        </div>
    );
};

export default Card;
