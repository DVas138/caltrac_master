import NavItem from "./NavItem.tsx";
const imageSources = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/953abdc577fe0c42786d78e2ec78715b26a24b8b05593d5d620394ecbca50c18?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Today",
    link: "/main/today",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/80a865a1892cafa048358c669df6a56f55c21d2518c50e8b7acb76587ad8894c?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Month",
    link: "/main/month",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbad12fb28f471d4ad3dbf35283d3b1d02fd583e850283b4e7f20eb06d71b912?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Add",
    link: "/main/add",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/afd3ec4b94d087889456e4de11a17ca4715e22604ae41f360a754953bcdcf974?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Settings",
    link: "/main/settings",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/da7de17ba438f080d37bb0505f963baaca9f4c9273d1badc0fa57c81a42b1598?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Logout",
    link: "/logout",
  },
];
export default function NarBar() {
  return (
    <header className="py-3.5 pr-20 pl-1 w-full bg-slate-800 max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2741f3981513f9944f06280c7390a0eee43fbd44a9aa5942a3426c86783e66a0?apiKey=ea474bbdb6aa47209952665d35262dd2&"
          alt="Special Image"
          className="grow shrink-0 max-w-full aspect-[3.03] w-[248px] max-md:mt-10"
        />
        <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-5 justify-between items-center self-stretch px-px my-auto max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            {imageSources.map((image) => (
              <NavItem
                src={image.src}
                alt={image.alt}
                link={image.link}
                key={image.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
