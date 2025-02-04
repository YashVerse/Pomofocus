import React from "react";

interface TagProps {
  val: string;
  index: number;
  onTagClicked: (index: number) => void;
  activeTag: number;
}

const Tag: React.FC<TagProps> = ({ val, index, onTagClicked, activeTag }) => {
  return (
    <>
      <button
        style={{
          all: "unset",
          backgroundColor:
            activeTag === index ? "rgba(0, 0, 0, 0.15)" : "transparent",
          fontWeight: activeTag === index ? 600 : "normal",
          borderRadius: "4px",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          boxShadow: "none",
        }}
        onClick={() => onTagClicked(index)}
      >
        {val}
      </button>
    </>
  );
};

export default Tag;