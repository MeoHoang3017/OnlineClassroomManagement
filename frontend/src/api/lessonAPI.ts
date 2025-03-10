import authorApi from "./baseAPI/authorAPI";
import { CreateLessonRequest } from "../types/LessonTypes";
const LessonAPI = {
    getAllLessons: () => authorApi.get('/lessons').then(response => response.data),
    getLessonById: (id: string) => authorApi.get(`/lessons/${id}`).then(response => response.data),
    createLesson: (lesson: CreateLessonRequest) => authorApi.post('/lessons', lesson).then(response => response.data),
    updateLesson: (id: string, lesson: CreateLessonRequest) => authorApi.put(`/lessons/${id}`, lesson).then(response => response.data),
    deleteLesson: (id: string) => authorApi.delete(`/lessons/${id}`).then(response => response.data),
}
export default LessonAPI;