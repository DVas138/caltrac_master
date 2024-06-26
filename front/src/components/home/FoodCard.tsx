// import { ReactNode } from "react";
//
// export default function FoodCard({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex flex-col justify-center mt-4">
//       {/*max-md:max-w-full*/}
//       <div className="flex grow items-center gap-5 px-9 py-5 rounded-3xl bg-slate-800 w-max">
//         {children}
//         <div className="grid grid-rows-2 grid-cols-[auto_1fr] size-fit ">
//           <span className="inline-block row-start-1 size-fit px-2">
//             Food: Beef
//           </span>
//           <span className="inline-block row-start-2 size-fit px-2">
//             2000 Calories
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

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
