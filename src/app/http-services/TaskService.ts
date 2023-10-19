import {TaskModel} from "@/app/models/TaskModel";

const baseUrl = 'http://localhost:8080/ToDoListWS/api';

export const getAllTasks = async (): Promise<TaskModel[]> => {

    const res = await fetch(`${baseUrl}/tasks/getAll`, {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return await res.json();
}

export const addTask = async (taskModel: TaskModel): Promise<TaskModel> => {

    const res = await fetch(`${baseUrl}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskModel),
    });
    return await res.json();
}

export const editTask = async (taskModel: TaskModel): Promise<TaskModel> => {

    const res = await fetch(`${baseUrl}/tasks/${taskModel._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskModel),
    });
    return await res.json();
}

export const deleteTask = async (id: number): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
}
