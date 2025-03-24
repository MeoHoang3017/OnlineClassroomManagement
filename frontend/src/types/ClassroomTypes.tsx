
export interface Classroom {
    id: string;
    _id: string;
    classCode: string;
    name: string;
    description: string;
    students: string[];
    image: string;
    createdBy: {
        _id: string;
        username: string;
    };
    createdAt: string;
}

export interface createClassroom {
    classCode: string;
    name: string;
    description: string;
}