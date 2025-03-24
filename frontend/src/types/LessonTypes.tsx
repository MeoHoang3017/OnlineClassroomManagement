import { Classroom } from "./ClassroomTypes";
export interface Lesson {
    class: Classroom,
    _id: string,
    name: string,
    description: string,
    videoUrl: string,
    classId: string,
    thumbnailUrl: string,
    createdBy: {
        _id: string,
        username: string
    },
    createdAt: string
}

export interface CreateLessonRequest {
    name: string,
    description: string,
    videoUrl: string,
    classId: string,
    thumbnailUrl: string,
}
