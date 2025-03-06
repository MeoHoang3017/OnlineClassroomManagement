import { useState } from 'react';
import { Classroom } from '../../types/ClassroomTypes';
import AddClassroomModal from './AddClass';

const ClassroomManagement = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([
        { id: 1, name: "Math 101", description: "Basic Mathematics", students: 25, createdBy: "User1" },
        { id: 2, name: "Physics 202", description: "Advanced Physics", students: 30, createdBy: "User2" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addClassroom = (name: string, description: string) => {
        setClassrooms([...classrooms, { id: classrooms.length + 1, name, description, students: 0, createdBy: "CurrentUser" }]);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Classroom Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
                onClick={() => setIsModalOpen(true)}
            >
                Add Classroom
            </button>
            <AddClassroomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addClassroom} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classrooms.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="border p-4 rounded-md shadow-md bg-white"
                    >
                        <h2 className="text-xl font-semibold">{classroom.name}</h2>
                        <p className="text-gray-600 mb-2">{classroom.description}</p>
                        <p className="text-sm text-gray-500">Students: {classroom.students}</p>
                        <p className="text-sm text-gray-500">Created By: {classroom.createdBy}</p>
                        <button
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => setClassrooms(classrooms.filter(c => c.id !== classroom.id))}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassroomManagement;
