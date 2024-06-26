// import React from "react";
// import "./curcilar.css";
const CircularProgressBar = ({
  size,
  progress,
  strokeWidth,
  color,
}: {
  size: number;
  progress: number;
  strokeWidth: number;
  color: string;
}) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="circular-progress" width={size} height={size}>
      <circle
        className="progress-circle"
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};

export default CircularProgressBar;
