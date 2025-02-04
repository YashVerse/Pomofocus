import React, { createContext, useEffect, useState, ReactNode } from "react";


interface TimerContextType {
  activeTag: number;
  setActiveTag: (value: number) => void;
  time: number;
  setTime: (value: number | ((prev: number) => number)) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  workTime: number;
  setWorkTime: (value: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (value: number) => void;
  longBreakTime: number;
  setLongBreakTime: (value: number) => void;
  totalTime: number;
}

interface StateProviderProps {
  children: ReactNode;
}

export const StateContext = createContext<TimerContextType | undefined>(undefined);

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [workTime, setWorkTime] = useState<number>(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState<number>(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState<number>(15 * 60);
  const [activeTag, setActiveTag] = useState<number>(0);
  const [time, setTime] = useState<number>(workTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(workTime);

  useEffect(() => {
    let newTime: number;
    switch (activeTag) {
      case 0:
        newTime = workTime;
        document.body.style.backgroundColor = "rgb(186,73,73)";
        break;
      case 1:
        newTime = shortBreakTime;
        document.body.style.backgroundColor = "rgb(56, 133, 138)";
        break;
      case 2:
        newTime = longBreakTime;
        document.body.style.backgroundColor = "rgb(57, 112, 151)";
        break;
      default:
        newTime = workTime;
    }
    setTime(newTime);
    setTotalTime(newTime);
  }, [activeTag, workTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    let timer: number | undefined;
    if (isActive && time > 0) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const contextValue: TimerContextType = {
    activeTag,
    setActiveTag,
    time,
    setTime,
    isActive,
    setIsActive,
    workTime,
    setWorkTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    totalTime,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useTimerContext = (): TimerContextType => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a StateProvider');
  }
  return context;
};

export default StateProvider;