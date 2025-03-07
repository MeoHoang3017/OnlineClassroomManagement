import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MyLogo
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">Login</Link>
                    <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
                </div>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 bg-blue-700 p-4">
                    <Link to="/about" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link to="/services" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                        Services
                    </Link>
                    <Link to="/contact" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                    <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 text-center" onClick={() => setIsOpen(false)}>
                        Login
                    </Link>
                    <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center" onClick={() => setIsOpen(false)}>
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
