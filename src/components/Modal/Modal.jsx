import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
