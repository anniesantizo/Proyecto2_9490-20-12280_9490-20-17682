import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TaskDialog from "./TaskDialog";
import { deleteTask, editTask } from "../http-services/TaskService";
import { TaskModel } from "@/app/models/TaskModel";

interface TaskProps {
  task: TaskModel;
  onUpdateTask: (updatedTask: TaskModel) => void;
  onDeleteTask: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.description);

  const handleSubmitEditTodo = async () => {
    const updatedTask = await editTask({
      _id: task._id,
      description: taskToEdit,
      completed: task.completed
    });

    onUpdateTask(updatedTask);
    setOpenModalEdit(false);
  };

  const handleDeleteTask = async () => {
    await deleteTask(task._id);
    onDeleteTask(task._id);
    setOpenModalDeleted(false);
  };


  return (
      <tr key={task._id}>
        <td className='w-full'>{task.description}</td>
        <td className='flex gap-5 ml-auto'>
          <FiEdit
              onClick={() => setOpenModalEdit(true)}
              cursor='pointer'
              className='text-blue-500'
              size={25}
          />
          <TaskDialog modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg'>Editar tarea</h3>
              <div className='modal-action'>
                <input
                    value={taskToEdit}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full'
                />
                <button type='submit' className='btn'>
                  Editar
                </button>
              </div>
            </form>
          </TaskDialog>
          <FiTrash2
              onClick={() => setOpenModalDeleted(true)}
              cursor='pointer'
              className='text-red-500'
              size={25}
          />
          <TaskDialog modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className='text-lg'>
              ¿Seguro que quieres eliminar esta tarea?
            </h3>
            <div className='modal-action'>
              <button onClick={handleDeleteTask} className='btn'>
                Si
              </button>
            </div>
          </TaskDialog>
        </td>
      </tr>
  );
};

export default Task;
