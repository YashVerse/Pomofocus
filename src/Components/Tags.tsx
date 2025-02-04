import React from "react";
import Tag from "./Tag";
import { useTimerContext } from "./StateProvider"

const Tags: React.FC = () => {
  const arr: string[] = ["Pomodoro", "Short Break", "Long Break"];
  const { activeTag, setActiveTag } = useTimerContext();

  const handleOnClick = (index: number): void => {
    setActiveTag(index);
  };

  return (
    <>
      {arr.map((item, i) => (
        <Tag
          key={i}
          val={item}
          index={i}
          onTagClicked={handleOnClick}
          activeTag={activeTag}
        />
      ))}
    </>
  );
};

export default Tags;