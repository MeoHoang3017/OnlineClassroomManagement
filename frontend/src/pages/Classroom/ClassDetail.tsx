import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Grid } from '@mui/material';
import StudentList from '../User/StudentList';
import { useParams } from 'react-router-dom';
import useClassroom from '../../hooks/useClassroom';
import { Classroom } from '../../types/ClassroomTypes';
import { AuthContext } from '../../contexts/AuthContext';
import LessonList from '../Lesson/LessonList';
import ApprovementList from '../ApprovementList';

const ClassDetail = () => {
    const [classroom, setClassroom] = React.useState<Classroom>({} as Classroom);
    const { user } = useContext(AuthContext);
    const { getClass, joinClass, leaveClass } = useClassroom();
    const { classroomId } = useParams();
    const [activeTab, setActiveTab] = useState<'lessons' | 'students' | 'approvements'>('lessons'); // Added 'approvements' tab
    const baseImage = 'https://gstatic.com/classroom/themes/img_graduation.jpg';

    useEffect(() => {
        async function fetchData() {
            const data = await getClass(classroomId as string);
            setClassroom(data as Classroom);
        }
        fetchData();
    }, [classroomId]);

    const handleJoinClass = async (classId: string) => {
        await joinClass(classId);
        const data = await getClass(classroomId as string);
        setClassroom(data as Classroom);
    };

    const handleLeaveClass = async (classId: string) => {
        await leaveClass(classId);
        const data = await getClass(classroomId as string);
        setClassroom(data as Classroom);
    };

    return (
        <Grid>
            <div className="p-6 col-end-3">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={classroom?.image || baseImage}
                            alt="Class Thumbnail"
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 text-white bg-opacity-75 px-4 py-2">
                            <h1 className="text-xl font-bold">{classroom.name}</h1>
                            <p className="text-lg">Class Code: {classroom.classCode}</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-600"><span className="font-semibold">Description:</span> {classroom.description}</p>
                        <p className="text-gray-600"><span className="font-semibold">Created By:</span> {classroom.createdBy?.username || 'Unknown'}</p>
                        <p className="text-gray-600"><span className="font-semibold">Created At:</span> {new Date(classroom.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600"><span className="font-semibold">Students:</span> {classroom.students?.length}</p>
                    </div>
                    <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end gap-2">
                        {user && user.id === classroom?.createdBy?._id ? (
                            <span className="text-sm text-gray-500 p-2.5">
                                You are the teacher of this classroom.
                            </span>
                        ) : user && classroom.students?.includes(user.id) ? (
                            <Button variant="danger" onClick={() => handleLeaveClass(classroomId as string)}>Leave Class</Button>
                        ) : (
                            <Button variant="success" onClick={() => handleJoinClass(classroomId as string)}>Join Class</Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-end-9 p-6">
                <div className="mb-4">
                    {/* Tabs */}
                    <button
                        className={`px-4 py-2 font-semibold border-b-2 ${activeTab === 'lessons' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
                        onClick={() => setActiveTab('lessons')}
                    >
                        Lessons
                    </button>

                    {(user && (user.role === 'Teacher' || user.role === 'Admin' || classroom.students?.includes(user.id))) && (
                        <button
                            className={`px-4 py-2 font-semibold border-b-2 ${activeTab === 'students' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => setActiveTab('students')}
                        >
                            Students
                        </button>
                    )}

                    {user && user.role === 'Teacher' && (
                        <button
                            className={`px-4 py-2 font-semibold border-b-2 ${activeTab === 'approvements' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => setActiveTab('approvements')}
                        >
                            Approvements
                        </button>
                    )}
                </div>

                {user && (user.id === classroom.createdBy?._id || classroom.students?.includes(user.id)) ? (
                    <div>
                        {activeTab === 'lessons' && <LessonList classId={classroomId || ''} />}
                        {activeTab === 'students' && <StudentList classId={classroomId || ''} />}
                        {activeTab === 'approvements' && <ApprovementList classId={classroomId || ''} />}
                    </div>
                ) : (
                    <div className="shadow-lg rounded-lg p-6 text-red-500">
                        {user && user.role === 'Teacher' ? 'You are not the teacher of this classroom.' : 'You are not a member of this classroom. Join the class to see the content.'}
                    </div>
                )}
            </div>
        </Grid>
    );
};

export default ClassDetail;
