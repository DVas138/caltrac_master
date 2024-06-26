import { ReactNode } from "react";

export default function FoodCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center mt-4 w-full">
      <div className="text-xl grid grid-rows-3 grid-cols-2 size-full  bg-slate-800 rounded-2xl ">
        <div className="col-start-1 row-span-2">{children}</div>
        <span className="inline-block row-start-1 col-start-2 place-self-center size-fit px-2">
          Food: Beef
        </span>
        <span className="inline-block row-start-2 col-start-2 place-self-center size-fit px-2">
          2000 Calories
        </span>
        <div className="row-start-3 col-span-2 w-[90%] place-self-center  bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full "
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
