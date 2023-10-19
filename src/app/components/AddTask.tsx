"use client";
import { AiOutlinePlus } from "react-icons/ai";
import TaskDialog from "./TaskDialog";
import { FormEventHandler, useState } from "react";
import { addTask } from "../http-services/TaskService";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const AddTask = ({ onAddTask }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newTask= {
      _id: uuidv4(),
      description: newTaskValue,
      completed: false
    };

    try {
      await addTask(newTask);
      setNewTaskValue("");
      setModalOpen(false);
      onAddTask(newTask);
      router.refresh();
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  return (
    <div>
      <div className="fixed bottom-4 right-4">
        <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-3 shadow-lg"
            style={{ width: "48px", height: "48px" }}
        >
          <AiOutlinePlus size={24} />
        </button>
      </div>
      <TaskDialog modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Agregar tareas</h3>
          <div className='modal-action'>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type='text'
              placeholder='Ingrese tarea...'
              className='input input-bordered w-full'
            />
            <button type='submit' className='btn'>
              Agregar
            </button>
          </div>
        </form>
      </TaskDialog>
    </div>
  );
};

export default AddTask;
