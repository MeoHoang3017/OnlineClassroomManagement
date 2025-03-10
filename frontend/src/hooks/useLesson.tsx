import { useState, useEffect } from "react";
import lessonAPI from "../api/lessonAPI";
import { Lesson, CreateLessonRequest } from "../types/LessonTypes";

const useLesson = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const lessons = await lessonAPI.getAllLessons();
                setLessons(lessons);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLessons();
    }, []);

    const getAllLessons = async () => {
        try {
            const lessons = await lessonAPI.getAllLessons();
            setLessons(lessons);
        } catch (error) {
            console.error(error);
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

    const createLesson = async (form: CreateLessonRequest) => {
        try {
            const lesson = await lessonAPI.createLesson(form);
            setLessons([...lessons, lesson]);
        } catch (error) {
            console.error(error);
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

    return { lessons, loading, getAllLessons, getLesson, createLesson, updateLesson, deleteLesson };
};

export default useLesson;