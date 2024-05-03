import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Error404 from "./components/Error404.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error404></Error404>,
  },
  {
    path: "app",
    element: <Dashboard></Dashboard>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
