export default function DateBox({ date }: { date: string[] | string }) {
  if (typeof date === "string") date = [date];
  const dates = date.map((date, index) => (
    <li key={index}>
      {index === 1 ? (
        <hr className="h-px border-y-2 border-gray-600 rounded mb-0.5 " />
      ) : (
        ""
      )}
      {date}
    </li>
  ));
  return (
    <div className="justify-center px-5 py-4 bg-amber-100 rounded-3xl max-md:px-5">
      <ul className="flex flex-col gap-2  text-2xl text-center">{dates}</ul>
    </div>
  );
}
