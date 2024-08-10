import React from "react";
import "./modal.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // <div className="modal">
    //   <div className="modal-content min-w-[280px]">
    //     <span className="close-button" onClick={onClose}>
    //       &times;
    //     </span>
    //     {children}
    //   </div>
    // </div>
    <div className="w-full absolute bottom-0 z-[9999]">
      <div className="flex items-center justify-center bg-[#141414] h-[450px] rounded-t-[40px]">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
