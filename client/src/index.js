import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EquipmentList from "./Pages/EquipmentList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquimentUpdater from "./Pages/EquipmentUpdater";
import GetRobert from "./Pages/GetRobert";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/robert",
        element: <GetRobert />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator />
      },
      {
        path: "/equipment",
        element: <EquipmentList/>
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/updateEquipment/:id",
        element: <EquimentUpdater />
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
