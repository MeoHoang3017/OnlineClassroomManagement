import React, { useState, useEffect, useContext } from "react";
import { Trash2 } from "lucide-react"; // Import delete icon
import useClassroom from "../../hooks/useClassroom";
import { AuthContext } from "../../contexts/AuthContext"; // Import Auth context

const studentsSample = [
    { email: "john.doe@example.com", username: "John Doe" },
    { email: "jane.smith@example.com", username: "Jane Smith" },
    { email: "alice.williams@example.com", username: "Alice Williams" },
];

interface StudentListProps {
    classId: string;
}

const StudentList = ({ classId }: StudentListProps) => {
    const [students, setStudents] = useState(studentsSample);
    const { viewStudentsInClass } = useClassroom();
    const { user } = useContext(AuthContext); // Access user from AuthContext

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await viewStudentsInClass(classId);
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, [classId]);

    const handleDelete = (email: string) => {
        setStudents((prev) => prev.filter((student) => student.email !== email));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Classroom Student List</h1>
            <div className="overflow-hidden rounded-xl border border-gray-300 shadow-md">
                <table className="w-full bg-white">
                    {/* Header */}
                    <thead className="bg-gray-100 text-gray-700">
                        <tr className="border-b">
                            <th className="px-6 py-4 text-left font-medium">Username</th>
                            <th className="px-6 py-4 text-left font-medium">Email</th>
                            {user?.role === "Teacher" && ( // Only show "Action" column for teachers
                                <th className="px-6 py-4 text-center font-medium">Action</th>
                            )}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {students.map((student, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-800">{student.username}</td>
                                <td className="px-6 py-4 text-gray-700">{student.email}</td>
                                {user?.role === "Teacher" && ( // Only show delete button for teachers
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(student.email)}
                                            className="p-2 rounded-full text-red-500 hover:bg-red-100 transition"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
