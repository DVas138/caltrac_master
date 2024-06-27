import "./ProgressBar.css";
export default function ProgressBar({
  goals,
  byNow,
}: {
  goals: number;
  byNow: number;
}) {
  const progress = Math.round((byNow / goals) * 100);
  const circular = 282.7 - (282.7 * progress) / 100;
  return (
    <div className="justify-center items-center self-stretch mx-8 m-auto w-full text-2xl text-black max-md:px-5 max-md:p-10 max-md:m-10">
      {/*//  The circumference of a circle is calculated with C = 2πr*/}
      {/*  In this case, we assume a radius of 40 */}
      {/* Therefore, calculation goes thus: C= 2 × π × 40; which gives approx 251.2 */}
      {/* The progress difference is then calculated as such: circumference - ( circumference * currentProgress ) / 100  */}
      {/*<div className="relative w-40 h-40">*/}

      {/*<div className="relative w-400 h-400">*/}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        ></circle>

        <circle
          className="progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={circular}
        ></circle>

        <text
          x="52"
          y="35"
          fontFamily="Verdana"
          fontSize="15"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {progress}%
        </text>
        <line
          x1="18"
          y1="49"
          x2="79"
          y2="49"
          style={{ stroke: "red", strokeWidth: 3, strokeLinecap: "round" }}
        />
        <text
          x="52"
          y="63"
          fontFamily="Verdana"
          fontSize="13"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {byNow} kcal
        </text>
      </svg>
      {/*</div>*/}
    </div>
  );
}
