import NarBar from "./nav/NavBar.tsx";
import { Outlet } from "react-router-dom";
import FooterBar from "./footer/FooterBar.tsx";

export default function RootComponent() {
  return (
    <div className="flex flex-col h-dvh ">
      <NarBar />
      <Outlet />
      <FooterBar />
    </div>
  );
}
