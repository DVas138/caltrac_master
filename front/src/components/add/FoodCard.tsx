import { ReactNode } from "react";

export default function FoodCard({
  children,
  name,
  calories,
  amount,
  onFilter,
}: {
  children: ReactNode;
  name: string;
  calories: number;
  amount: number;
  onFilter: (food: string) => void;
}) {
  return (
    // <div className="flex flex-col justify-center mt-4 w-full">
    <div className="text-xl grid grid-rows-3 grid-cols-2 size-max bg-slate-800 rounded-2xl px-5 py-2   ">
      <div
        onClick={() => onFilter(name)}
        className="col-start-1 row-start-1 row-end-4 justify-self-center self-center size-fit"
      >
        {children}
      </div>
      <span className="inline-block row-start-1 row-end-2 col-start-2 place-self-center size-fit px-2 text-slate-50">
        Food: {name}
      </span>
      <span className="inline-block row-start-2 row-end-3 col-start-2 place-self-center size-fit px-2 text-slate-50">
        {calories} Calories
      </span>
      <span className="inline-block row-start-3 row-end-4 col-start-2 place-self-center size-fit px-2 text-slate-50">
        {amount} g
      </span>
    </div>
    // </div>
  );
}
