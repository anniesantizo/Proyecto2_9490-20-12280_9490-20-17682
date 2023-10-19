import React from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const TaskDialog: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
      <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className='modal-box relative'>
          <button
              onClick={() => setModalOpen(false)}
              className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            <FiX />
          </button>
          {children}
        </div>
      </div>
  );
};

export default TaskDialog;
