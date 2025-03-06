import React from 'react';

const HomePage = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="text-xl font-bold text-indigo-600">MyWebsite</a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-indigo-600">Home</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600">Services</a>
                            <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-indigo-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to MyWebsite</h1>
                    <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
                    <a href="#" className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100">Learn More</a>
                </div>
            </header>

            {/* Content Sections */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600">&copy; 2025 MyWebsite. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
