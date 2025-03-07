import authorApi from "./baseAPI/authorAPI";
import { Classroom, createClassroom } from "../types/ClassroomTypes";

const classAPI = {
    getClasses: () => authorApi.get('/classrooms').then(response => response.data),
    getClass: (id: string) => authorApi.get(`/classrooms/byId/${id}`).then(response => response.data),
    createClass: (form: createClassroom) => authorApi.post('/classrooms', form).then(response => response.data),
    updateClass: (id: string, form: Classroom) => authorApi.put(`/classrooms/${id}`, form).then(response => response.data),
    deleteClass: (id: string) => authorApi.delete(`/classrooms/${id}`).then(response => response.data),
}

export default classAPI