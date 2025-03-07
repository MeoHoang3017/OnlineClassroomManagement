
export interface Classroom {
    id: string;
    _id: string;
    name: string;
    description: string;
    students: string[];
    createdBy: {
        _id: string;
        username: string;
    };
}

export interface createClassroom {
    classCode: string;
    name: string;
    description: string;
}