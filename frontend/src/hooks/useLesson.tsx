import { useState } from "react";
import lessonAPI from "../api/lessonAPI";
import { Lesson, CreateLessonRequest } from "../types/LessonTypes";

const useLesson = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    const getAllLessons = async () => {
        try {
            setLoading(true);
            const lessons = await lessonAPI.getAllLessons();
            setLessons(lessons);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getLesson = async (id: string) => {
        try {
            const lesson = await lessonAPI.getLessonById(id);
            return lesson;
        } catch (error) {
            console.error(error);
        }
    }

    const createLesson = async (form: CreateLessonRequest): Promise<Lesson | undefined> => {
        try {
            const lesson = await lessonAPI.createLesson(form);
            setLessons([...lessons, lesson]);
            return lesson;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    const updateLesson = async (id: string, form: CreateLessonRequest) => {
        try {
            const lesson = await lessonAPI.updateLesson(id, form);
            setLessons(lessons.map((l: Lesson) => (l._id === id ? lesson : l)));
        } catch (error) {
            console.error(error);
        }
    }

    const deleteLesson = async (id: string) => {
        try {
            await lessonAPI.deleteLesson(id);
            setLessons(lessons.filter((l: Lesson) => l._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const getLessonsByClass = async (classId: string) => {
        try {
            const lessons = await lessonAPI.getLessonByClassId(classId);
            setLessons(lessons);
        } catch (error) {
            console.error(error);
        }
    }

    return { lessons, loading, getAllLessons, getLesson, createLesson, updateLesson, deleteLesson, getLessonsByClass };
};

export default useLesson;