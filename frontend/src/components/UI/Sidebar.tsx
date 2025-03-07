import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        { name: "Classroom Management", link: "/classroom", icon: "classroom" },
        { name: "User Management", link: "/user", icon: "user" },
        { name: "Class List", link: "/class-list", icon: "class-list" },
        { name: "Lesson Management", link: "/lesson", icon: "lesson" },
    ];

    return (
        <div className="fixed bottom-4 left-4">
            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-stone-100 text-black rounded-full shadow-lg focus:outline-none"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Popup Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 left-0 w-48 bg-white rounded-lg shadow-lg p-2"
                >
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className="p-2 text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => {
                                    navigate(item.link);
                                    setIsOpen(false);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default SidebarMenu;
