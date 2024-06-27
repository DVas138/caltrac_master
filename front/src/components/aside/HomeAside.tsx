// const date: string = "27 | 05";
import DateBox from "./DateBox.tsx";
export default function HomeAside({ week }: { week: string[] }) {
  const weekDates = week
    .map((date) => {
      return new Date(date).toLocaleString().split(",")[0];
    })
    .reverse();
  return (
    <aside className="flex flex-col px-3 py-10 text-lg text-center text-rose-500 rounded-e-3xl bg-slate-800 my-16">
      <DateBox date={weekDates[0]} />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/577f0d4946b573f048722d96f925c574a31f732d786bf1220185707f812e099e?apiKey=ea474bbdb6aa47209952665d35262dd2&"
        alt="Special Image 6"
        className="my-11 mx-2.5 max-w-full aspect-[0.24] w-[111px] max-md:mt-10"
      />
      <DateBox date={weekDates} />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/577f0d4946b573f048722d96f925c574a31f732d786bf1220185707f812e099e?apiKey=ea474bbdb6aa47209952665d35262dd2&"
        alt="Special Image 7"
        className="my-11 mx-2.5 max-w-full aspect-[0.24] w-[111px] max-md:mt-10"
      />
    </aside>
  );
}
