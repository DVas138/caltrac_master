import "./curcilar.css";
import { FC } from "react";
export const CircularBarOverlapping: FC<{
  progress: number;
  className: string;
}> = ({ progress, className }) => {
  return (
    <>
      <div className={"circular-progress " + className}>
        <div className="progress" style={{ width: progress }}></div>
      </div>
    </>
  );
};
