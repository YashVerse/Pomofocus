
import React, { useState, useEffect } from 'react';
import styles from './TaskDialog.module.css';
import { Task } from './interfaces';

interface TaskDialogProps {
  onSave: (task: { name: string; estimatedPomodoros: number; note?: string; project?: string }) => void;
  onCancel: () => void;
  onDelete?: () => void;
  initialTask?: Task | null;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ onSave, onCancel, onDelete, initialTask }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [pomodoros, setPomodoros] = useState<number>(1);
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
  const [showProjectInput, setShowProjectInput] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [project, setProject] = useState<string>('');

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.name);
      setPomodoros(initialTask.estimatedPomodoros);
      if (initialTask.note) {
        setNote(initialTask.note);
        setShowNoteInput(true);
      }
      if (initialTask.project) {
        setProject(initialTask.project);
        setShowProjectInput(true);
      }
    }
  }, [initialTask]);

  const handleSave = () => {
    if (taskName.trim()) {
      onSave({
        name: taskName.trim(),
        estimatedPomodoros: pomodoros,
        note: note.trim() || undefined,
        project: project.trim() || undefined
      });
    }
  };

  return (
    <div className={styles.dialog}>
      <input
        type="text"
        placeholder="What are you working on?"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className={styles.taskInput}
        autoFocus
      />
      
      <div className={styles.pomodoroSection}>
        <label>Est Pomodoros</label>
        <div className={styles.pomodoroControls}>
          <input
            type="text"
            value={pomodoros}
            readOnly
            className={styles.pomodoroInput}
          />
          <div className={styles.arrowButtons}>
            <button onClick={() => setPomodoros(prev => prev + 1)}>▲</button>
            <button onClick={() => pomodoros > 1 && setPomodoros(prev => prev - 1)}>▼</button>
          </div>
        </div>
      </div>

      <div className={styles.additionalInputs}>
        {!showNoteInput && (
          <button onClick={() => setShowNoteInput(true)} className={styles.addButton}>
            + Add Note
          </button>
        )}
        {showNoteInput && (
          <input
            type="text"
            placeholder="Add note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={styles.taskInput}
          />
        )}
        {!showProjectInput && (
          <button onClick={() => setShowProjectInput(true)} className={styles.addButton}>
            + Add Project
          </button>
        )}
        {showProjectInput && (
          <input
            type="text"
            placeholder="Add project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className={styles.taskInput}
          />
        )}
      </div>

      <div className={styles.dialogFooter}>
        {onDelete && (
          <button 
            onClick={onDelete}
            className={`${styles.deleteButton}`}
          >
            Delete
          </button>
        )}
        <div className={styles.rightButtons}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!taskName.trim()}
            className={styles.saveButton}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};