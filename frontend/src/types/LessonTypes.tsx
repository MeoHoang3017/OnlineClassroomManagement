export interface Lesson {
    _id: string,
    name: string,
    description: string,
    videoUrl: string,
    classId: string,
    thumbnailUrl: string,
    createdBy: string
}

export interface CreateLessonRequest {
    name: string,
    description: string,
    videoUrl: string,
    classId: string,
    thumbnailUrl: string,
}
