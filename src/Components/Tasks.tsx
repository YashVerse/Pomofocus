
import React, { useState } from "react";
import { Task } from './interfaces';
import { TaskDialog } from './TaskDialog';
import styles from './Pomofocus.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoAddCircleSharp } from "react-icons/io5";
import styles1 from "./AddTodo.module.css";
import TodoHead from "./TodoHead";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (taskData: { 
    name: string; 
    estimatedPomodoros: number; 
    note?: string; 
    project?: string 
  }): void => {
    if (editingTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === editingTask.id 
            ? {
                ...task,
                name: taskData.name,
                estimatedPomodoros: taskData.estimatedPomodoros,
                note: taskData.note,
                project: taskData.project
              }
            : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          name: taskData.name,
          estimatedPomodoros: taskData.estimatedPomodoros,
          completedPomodoros: 0,
          completed: false,
          note: taskData.note,
          project: taskData.project
        },
      ]);
    }
    setShowDialog(false);
  };

  const handleToggleComplete = (taskId: number): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: number): void => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setShowDialog(false);
    setEditingTask(null);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowDialog(true);
  };

  return (
    <div className={styles.container}>
      <TodoHead></TodoHead>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskLeft}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className={styles.checkbox}
              />
              <span className={`${styles.taskName} ${task.completed ? styles.completed : ''}`}>
                {task.name}
              </span>
            </div>
            <div className={styles.taskRight}>
              <span className={styles.pomodoroCount}>
                {task.completedPomodoros}/{task.estimatedPomodoros}
              </span>
              <button 
                className={styles.menuButton}
                onClick={() => handleEditClick(task)}
              >
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
        ))}

        {!showDialog ? (
          <button
            onClick={() => setShowDialog(true)}
            className={styles1.button}
          >
            <IoAddCircleSharp className="text-xl" />
            <span>Add Task</span>
          </button>
        ) : (
          <TaskDialog
            onSave={handleAddTask}
            onCancel={() => {
              setShowDialog(false);
              setEditingTask(null);
            }}
            onDelete={editingTask ? () => handleDeleteTask(editingTask.id) : undefined}
            initialTask={editingTask}
          />
        )}
      </div>

      <div className={styles.pomodoroStatus}>
        <span>Pomos: {tasks.reduce((acc, task) => acc + task.completedPomodoros, 0)}/
          {tasks.reduce((acc, task) => acc + task.estimatedPomodoros, 0)}</span>
      </div>
    </div>
  );
};

export default Tasks;