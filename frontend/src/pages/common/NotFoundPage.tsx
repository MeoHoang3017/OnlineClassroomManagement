import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-md">
                {/* Icon */}
                <div className="text-blue-600 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-20 h-20 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M12 19.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
                        />
                    </svg>
                </div>

                {/* Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Redirect Button */}
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
