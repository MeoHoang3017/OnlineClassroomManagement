import React from 'react';
import { Button } from '../../components/common/Button';
import { Grid } from '@mui/material';
const ClassDetail = () => {
    // Placeholder data
    const classData = {
        classCode: 'CLASS001',
        name: 'Introduction to Programming',
        description: 'Learn the fundamentals of programming.',
        image: 'https://gstatic.com/classroom/themes/img_graduation.jpg', // Replace with actual image URL
        students: ['Student 1', 'Student 2', 'Student 3'],
        createdBy: {
            username: 'Instructor Name'
        },
        createdAt: '2025-03-07T10:15:00Z',
    };

    return (
        <Grid>
            <div className="p-6 col-end-3">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                        {classData.image && (
                            <img
                                src={classData.image}
                                alt="Class Thumbnail"
                                className="w-full h-64 object-cover"
                            />
                        )}
                        <div className="absolute bottom-2 left-2 text-white bg-opacity-75 px-4 py-2">
                            <h1 className="text-xl font-bold">{classData.name}</h1>
                            <p className="text-lg">Class Code: {classData.classCode}</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-600"><span className="font-semibold">Description:</span> {classData.description}</p>
                        <p className="text-gray-600"><span className="font-semibold">Created By:</span> {classData.createdBy?.username || 'Unknown'}</p>
                        <p className="text-gray-600"><span className="font-semibold">Created At:</span> {new Date(classData.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600"><span className="font-semibold">Students:</span> {classData.students.length}</p>
                    </div>
                    <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end gap-2">
                        <Button variant="danger" onClick={() => { }}>Leave Class</Button>
                        <Button variant="success" onClick={() => { }}>Join Class</Button>
                    </div>
                </div>
            </div>
            <div className='col-end-9'>
                <div>
                    <h1> Incomming Feature</h1>
                </div>
            </div>
        </Grid>
    );
};

export default ClassDetail;
