const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-4 mt-8 shadow-gray-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
