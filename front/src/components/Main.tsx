import NarBar from "./nav/NavBar.tsx";
import {Outlet} from "react-router-dom";
import FooterBar from "./footer/FooterBar.tsx";


export default function RootComponent() {
  return (
    <div className="flex flex-col w-screen h-screen bg-[linear-gradient(39deg,rgba(240,240,240,0.00_37%,#2A2A44_100%),linear-gradient(141deg,#F0F0F0_36.96%,#2A2A44_99.4%))] ml-[calc(50%_-_50vw)]">
      <NarBar />
        <Outlet />
      <FooterBar />
    </div>
  );
}
