import React, { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "@/app/components/AddTask";
import {getAllTasks, editTask} from "@/app/http-services/TaskService";

const TaskList: React.FC = () => {
    const [taskList, setTaskList] = useState([]);

    const handleTaskCompletion = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };

        try {
            const updatedTaskResponse = await editTask(updatedTask);

            setTaskList((prevTaskList) =>
                prevTaskList.map((t) =>
                    t._id === updatedTaskResponse._id ? updatedTaskResponse : t
                )
            );
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await getAllTasks();
                setTaskList(tasksResponse);
            } catch (error) {
                console.error("Error al obtener la lista de tareas:", error);
            }
        };
        fetchTasks();
    }, []);


    const handleDeleteTask = async (taskId) => {
        try {
            setTaskList((prevTaskList) => prevTaskList.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const handleAddTask = async (newTask) => {
        try {
            setTaskList((prevTaskList) => [...prevTaskList, newTask]);
        } catch (error) {
            console.error("Error al agregar la tarea:", error);
        }
    }

    const handleUpdateTask = async (updatedTask) => {
        try {
            const updatedTaskResponse = await editTask(updatedTask);
            setTaskList((prevTaskList) =>
                prevTaskList.map((t) =>
                    t._id === updatedTaskResponse._id ? updatedTaskResponse : t
                )
            );
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    return (
        <section className="overflow-x-auto text-center pt-14">
            <header>
                <h1 className="text-2xl font-bold">Lista de tareas</h1>
            </header>
            <table className="table w-full">
                <thead>
                <tr>
                    <th className="w-5">Completada</th>
                    <th>Tarea</th>
                </tr>
                </thead>
                <tbody>
                {taskList.map((task) => (
                    <tr key={task._id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleTaskCompletion(task)}
                            />
                        </td>
                        <td>
                            <Task task={task} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <footer>
                <AddTask onAddTask={handleAddTask} />
            </footer>
        </section>
    );

};


export default TaskList;
