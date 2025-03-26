import { Classroom } from "./ClassroomTypes";
import { Documents } from "./FileTypes";
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
    createdAt: string,
    documents: Documents[]
}

export interface CreateLessonRequest {
    name: string,
    description: string,
    videoUrl: string,
    classId: string,
    thumbnailUrl: string,
    documents: string[]
}

export interface UpdateLessonRequest {
    name: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    classId: string
}