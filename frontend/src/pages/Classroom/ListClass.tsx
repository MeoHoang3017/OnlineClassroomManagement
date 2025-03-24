import { useState, useEffect, useContext } from 'react';
import useClassroom from '../../hooks/useClassroom';
import { Button } from '../../components/common/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const ListClass = () => {
    const { classes, getAllClasses, joinClass } = useClassroom(); // Assuming `joinClass` is a function in useClassroom hook
    const [filteredClasses, setFilteredClasses] = useState(classes);
    const [filter, setFilter] = useState(''); // For search by name
    const [sortBy, setSortBy] = useState(''); // For sort by day created
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        getAllClasses();
    }, []);


    useEffect(() => {
        // Filter and sort classes
        let updatedClasses = classes;

        // Filter by name
        if (filter) {
            updatedClasses = updatedClasses.filter((classroom) =>
                classroom.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        // Sort by createdAt date
        if (sortBy === 'date') {
            updatedClasses = [...updatedClasses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        // Sort by classroom name
        if (sortBy === 'name') {
            updatedClasses = [...updatedClasses].sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredClasses(updatedClasses);
    }, [filter, sortBy, classes]);

    const handleJoinClass = async (classId: string) => {
        await joinClass(classId); // Implement the logic for joining a class
        await getAllClasses();
    };

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-3xl font-bold mb-6">Classroom List</h1>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    placeholder="Search by classroom name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded-md px-4 py-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="date">Date Created</option>
                    <option value="name">Classroom Name</option>
                </select>
            </div>

            {/* Classroom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredClasses.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="p-4" onClick={() => navigate(`/classroom/${classroom._id}`)}>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {classroom.name}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {classroom.description}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Students: {classroom.students.length}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Created By: {classroom.createdBy
                                    ? classroom.createdBy.username
                                    : "Unknown"}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
                            {user && classroom.students.includes(user.id) ? (
                                <span className="text-sm text-gray-500 p-2.5">
                                    You are already a member of this classroom.
                                </span>
                            ) : (

                                <Button
                                    variant="success"
                                    onClick={() => handleJoinClass(classroom._id)}
                                >
                                    Join Class
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListClass;
