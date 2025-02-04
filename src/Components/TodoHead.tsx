import React from "react";
import styles from "./TodoHead.module.css";

const TodoHead: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tasksName}>Tasks</div>
      <div className={styles.ThreeDots}>
      </div>
    </div>
  );
};

export default TodoHead;