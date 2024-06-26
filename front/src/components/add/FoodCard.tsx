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
    <div className="text-xl grid grid-rows-3 grid-cols-2 size-fit  bg-slate-800 rounded-2xl px-5">
      <div
        onClick={() => onFilter(name)}
        className="col-start-1 row-span-2 size-fit"
      >
        {children}
      </div>
      <span className="inline-block row-start-1 col-start-2 place-self-center size-fit px-2 text-slate-50">
        Food: {name}
      </span>
      <span className="inline-block row-start-2 col-start-2 place-self-center size-fit px-2 text-slate-50">
        {calories} Calories
      </span>
      <span className="inline-block row-start-2 col-start-2 place-self-center size-fit px-2 text-slate-50">
        {amount} g
      </span>
    </div>
    // </div>
  );
}
