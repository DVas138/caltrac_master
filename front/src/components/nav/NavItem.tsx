import { Link } from "react-router-dom";
export default function NavItem({
  src,
  alt,
  link,
}: {
  src: string;
  alt: string;
  link: string;
}) {
  return (
    <Link to={link} className={"w-fit"}>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 self-stretch my-auto aspect-square w-[51px]"
      />
    </Link>
  );
}
