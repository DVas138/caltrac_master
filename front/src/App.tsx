import "./App.css";

// import { NextUIProvider, CircularProgress } from "@nextui-org/react";
// import React from "react";
function App() {
  // const [value, setValue] = React.useState(70);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((v) => (v >= 100 ? 0 : v + 10));
  //   }, 500);
  //
  //   return () => clearInterval(interval);
  // }, []);

  // @ts-ignore
  // @ts-ignore
  return (
    // <NextUIProvider>
    //   <CircularProgress
    //     aria-label="Loading..."
    //     size="lg"
    //     value={value}
    //     color="warning"
    //     showValueLabel={true}
    //   />
    // </NextUIProvider>
    // <div className="relative w-40 h-40">
    //   <svg className="w-full h-full" viewBox="0 0 100 100">
    //     <circle
    //       className="text-gray-200 stroke-current"
    //       stroke-width="10"
    //       cx="50"
    //       cy="50"
    //       r="40"
    //       fill="transparent"
    //     ></circle>
    //
    //     <circle
    //       className="text-indigo-500  progress-ring__circle stroke-current"
    //       stroke-width="10"
    //       stroke-linecap="round"
    //       cx="50"
    //       cy="50"
    //       r="40"
    //       fill="transparent"
    //       stroke-dasharray="251.2"
    //       stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
    //     ></circle>
    //
    //     <text
    //       x="50"
    //       y="50"
    //       font-family="Verdana"
    //       font-size="12"
    //       text-anchor="middle"
    //       alignment-baseline="middle"
    //     >
    //       70%
    //     </text>
    //   </svg>
    // </div>
    <>
      <div
        className="radial-progress"
        style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" }}
        role="progressbar"
      >
        70%
      </div>
      <div
        className="radial-progress"
        style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}
        role="progressbar"
      >
        70%
      </div>
    </>
  );
}

export default App;
