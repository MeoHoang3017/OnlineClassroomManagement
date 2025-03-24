import authorApi from "./baseAPI/authorAPI";
import { Classroom, createClassroom } from "../types/ClassroomTypes";

const classAPI = {
    getClasses: () => authorApi.get('/classrooms').then(response => response.data),
    getClass: (id: string) => authorApi.get(`/classrooms/byId/${id}`).then(response => response.data),
    createClass: (form: createClassroom) => authorApi.post('/classrooms', form).then(response => response.data),
    updateClass: (id: string, form: Classroom) => authorApi.put(`/classrooms/${id}`, form).then(response => response.data),
    deleteClass: (id: string) => authorApi.delete(`/classrooms/${id}`).then(response => response.data),
    getClassesByUserId: (id: string) => authorApi.get(`/classrooms/byUserId/${id}`).then(response => response.data),
    getClassesByTeacherId: () => authorApi.get(`/classrooms/teacher`).then(response => response.data),
    viewStudentsInClass: (id: string) => authorApi.get(`/classrooms/students/${id}`).then(response => response.data),
    joinClass: (id: string) => authorApi.post(`/classrooms/join/${id}`).then(response => response.data),
    leaveClass: (id: string) => authorApi.post(`/classrooms/leave/${id}`).then(response => response.data),
}

export default classAPI