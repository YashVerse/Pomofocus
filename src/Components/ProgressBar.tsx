
import React from "react";
import { useTimerContext } from "./StateProvider";
import styles from './ProgressBar.module.css'; 

const ProgressBar: React.FC = () => {
  const { time, totalTime } = useTimerContext();
  const progress: number = Math.min(100, ((totalTime - time) / totalTime) * 100);

  return (
    <div className={styles.container}>
      <div 
        className={styles.progress} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ProgressBar;
