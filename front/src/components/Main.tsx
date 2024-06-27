import NarBar from "./nav/NavBar.tsx";
import { Outlet } from "react-router-dom";
import FooterBar from "./footer/FooterBar.tsx";

export default function RootComponent() {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <NarBar />
      <Outlet />
      <FooterBar />
    </div>
  );
}
