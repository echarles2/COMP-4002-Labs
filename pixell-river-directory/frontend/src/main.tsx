import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import EmployeesPage from "./components/EmployeesPage";
import OrganizationPage from "./components/OrganizationPage";
import "./styles.css";

var router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/employees" replace /> },
      { path: "employees", element: <EmployeesPage /> },
      { path: "organization", element: <OrganizationPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
