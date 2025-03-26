import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const renderPageNumbers = () => {
        const pages = [];

        // Generate page buttons dynamically
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-lg border transition duration-300 ${i === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-blue-500 hover:bg-blue-100'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center mt-4 space-x-2">
            {/* First Page Button */}
            <button
                onClick={() => onPageChange(1)}
                disabled={isFirstPage}
                className={`px-3 py-1 rounded-lg border ${isFirstPage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-100'
                    }`}
            >
                First
            </button>

            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`px-3 py-1 rounded-lg border ${isFirstPage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-100'
                    }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`px-3 py-1 rounded-lg border ${isLastPage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-100'
                    }`}
            >
                Next
            </button>

            {/* Last Page Button */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={isLastPage}
                className={`px-3 py-1 rounded-lg border ${isLastPage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-500 hover:bg-blue-100'
                    }`}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
