import FooterItem from "./FooterItem.tsx";

export default function FooterBar() {
  return (
    <footer className="flex flex-row justify-around py-7 px-20  mt-auto w-full text-lg text-white whitespace-nowrap bg-slate-800 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <FooterItem text="June - 2024" />
      <FooterItem text="Ruse" />
    </footer>
  );
}
