import classAPI from "../api/classAPI";
import { useState } from "react";
import { Classroom, createClassroom } from "../types/ClassroomTypes";

const useClassroom = () => {
    const [classes, setClasses] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);

    const getAllClasses = async () => {
        try {
            setLoading(true);
            const data = await classAPI.getClasses();
            console.log(data);
            setClasses(data);
        } catch (error) {
            console.error(error);
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const getClass = async (id: string) => {
        try {
            const data = await classAPI.getClass(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const createClass = async (form: createClassroom) => {
        try {
            const data = await classAPI.createClass(form);
            setClasses([...classes, data]);
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const updateClass = async (id: string, form: Classroom) => {
        try {
            const data = await classAPI.updateClass(id, form);
            setClasses(classes.map((c: Classroom) => (c._id === id ? data : c)));
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const deleteClass = async (id: string) => {
        try {
            await classAPI.deleteClass(id);
            setClasses(classes.filter((c: Classroom) => c._id !== id));
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const getClassesByUserId = async (id: string) => {
        try {
            const data = await classAPI.getClassesByUserId(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const getClassesByTeacherId = async () => {
        try {
            const data = await classAPI.getClassesByTeacherId();
            setClasses(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const viewStudentsInClass = async (id: string) => {
        try {
            const data = await classAPI.viewStudentsInClass(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const joinClass = async (id: string) => {
        try {
            const data = await classAPI.joinClass(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;

        }
    };

    const leaveClass = async (id: string) => {
        try {
            const data = await classAPI.leaveClass(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;

        }
    }
    return {
        classes, loading, getAllClasses, getClass, createClass, updateClass, deleteClass,
        getClassesByUserId, getClassesByTeacherId, joinClass, viewStudentsInClass, leaveClass
    };
};

export default useClassroom;