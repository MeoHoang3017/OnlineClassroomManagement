import classAPI from "../api/classAPI";
import { useState, useEffect } from "react";
import { Classroom, createClassroom } from "../types/ClassroomTypes";

const useClassroom = () => {
    const [classes, setClasses] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await classAPI.getClasses();
                setClasses(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClasses();
    }, []);

    const getAllClasses = async () => {
        try {
            const data = await classAPI.getClasses();
            console.log(data);
            setClasses(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getClass = async (id: string) => {
        try {
            const data = await classAPI.getClass(id);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const createClass = async (form: createClassroom) => {
        try {
            const data = await classAPI.createClass(form);
            setClasses([...classes, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateClass = async (id: string, form: Classroom) => {
        try {
            const data = await classAPI.updateClass(id, form);
            setClasses(classes.map((c: Classroom) => (c.id === id ? data : c)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteClass = async (id: string) => {
        try {
            await classAPI.deleteClass(id);
            setClasses(classes.filter((c: Classroom) => c._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return { classes, loading, getAllClasses, getClass, createClass, updateClass, deleteClass };
};

export default useClassroom;