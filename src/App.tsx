import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { Login } from "./screens/Login"
import { Perfil } from "./screens/Perfil";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/profile",
    element: <Perfil />
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
