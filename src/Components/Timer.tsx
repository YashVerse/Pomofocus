import React from "react";
import styles from "./Timer.module.css";
import Tags from "./Tags";
import { useTimerContext } from "./StateProvider"

import ProgressBar from "./ProgressBar";

const Timer: React.FC = () => {
  const {
    time,
    isActive,
    setIsActive,
    activeTag,
  } = useTimerContext();

 

  const getTime = (timeInSeconds: number): string => {
    const min: number = Math.floor(timeInSeconds / 60);
    const sec: number = timeInSeconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const toggleButton = (): void => {
    setIsActive(!isActive);
  };

  const handleColorChange = (): string => {
    switch (activeTag) {
      case 0:
        return "rgb(186,73,73)";
      case 1:
        return "rgb(56, 133, 138)";
      case 2:
        return "rgb(57, 112, 151)";
      default:
        return "rgb(186,73,73)";
    }
  };

  return (
    <div className={styles.pomodoroTimer}>
      <div className={styles.timerButtons}>
        <Tags />
      </div>
      <div className={styles.timerDisplay}>{getTime(time)}</div>
      <button
        className={styles.timerButton}
        onClick={toggleButton}
        style={{
          color: handleColorChange(),
          transition: "color 0.5s ease-in-out",
        }}
      >
        {isActive ? "PAUSE" : "START"}
      </button>
      <div>
        <ProgressBar />
      </div>
    </div>
  );
};

export default Timer;