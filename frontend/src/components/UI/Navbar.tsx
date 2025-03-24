import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white text-gray-800 shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    MyLogo
                </Link>

                {/* Desktop Menu */}
                {user ? (
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/dashboard" className="hover:text-blue-500 transition">
                            Dashboard
                        </Link>
                        <Link to="/profile" className="hover:text-blue-500 transition">
                            Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden md:flex space-x-6">
                        <Link
                            to="/login"
                            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </Link>
                    </div>
                )}

                {/* Hamburger Icon */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} className="text-gray-800" /> : <Menu size={28} className="text-gray-800" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 bg-gray-100 shadow-md p-4 rounded-lg mt-2">
                    <Link to="/" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link to="/services" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
                        Services
                    </Link>
                    <Link to="/contact" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                    {user ? (
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white text-center transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
