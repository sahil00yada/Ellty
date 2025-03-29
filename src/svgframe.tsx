"use client";

import { useState } from "react";

export default function SvgFrame() {
  const [isChecked, setIsChecked] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    setIsDone(!isDone);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <svg
        width="343"
        height="56"
        viewBox="0 0 343 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[343px]"
      >
        {/* Frame */}
        <rect
          x="0.5"
          y="0.5"
          width="342"
          height="55"
          rx="7.5"
          stroke="#E5E7EB"
        />

        {/* Checkbox */}
        <g onClick={handleCheckboxClick} className="cursor-pointer">
          <rect
            x="16"
            y="16"
            width="24"
            height="24"
            rx="6"
            fill={isChecked ? "#4F46E5" : "white"}
            stroke={isChecked ? "#4F46E5" : "#E5E7EB"}
          />
          {isChecked && (
            <path
              d="M22 28L26 32L34 24"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>

        {/* Text */}
        <text
          x="56"
          y="33"
          fill="#111827"
          fontSize="16"
          fontFamily="sans-serif"
        >
          Task description goes here
        </text>

        {/* Done Button */}
        <g onClick={handleButtonClick} className="cursor-pointer">
          <rect
            x="283"
            y="16"
            width="44"
            height="24"
            rx="12"
            fill={isDone ? "#4F46E5" : "#F3F4F6"}
          />
          <text
            x="295"
            y="33"
            fill={isDone ? "white" : "#6B7280"}
            fontSize="14"
            fontFamily="sans-serif"
            fontWeight="500"
          >
            Done
          </text>
        </g>
      </svg>
    </div>
  );
}
