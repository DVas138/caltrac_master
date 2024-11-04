import React from "react";
import ReactDOM from "react-dom/client";
import "./output.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn, {
  action as loginAction,
  logoutUser as logoutAction,
} from "./components/login/LogIn.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Main from "./components/Main.tsx";
import Today, { getUserToday as loadToday } from "./components/home/Today.tsx";
import Month from "./components/month/Month.tsx";
import InputFood, {
  action as inputAction,
} from "./components/add/InputFood.tsx";
import Settings, {
  load as loadSettings,
  action as settingsAction,
} from "./components/setting/Settings.tsx";
import Admin from "./components/admin/Admin.tsx";
import Register, {
  action as registerAction,
} from "./components/login/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/main",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "today",
        element: <Today />,
        // index: true,
        loader: loadToday,
      },
      {
        path: "month",
        element: <Month />,
      },
      {
        path: "add",
        element: <InputFood />,
        action: inputAction,
      },
      {
        path: "settings",
        element: <Settings />,
        loader: loadSettings,
        action: settingsAction,
      },
    ],
  },
  {
    path: "logout",
    loader: logoutAction,
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
