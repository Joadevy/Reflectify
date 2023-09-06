import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error/errorPage.tsx";
import App from "./App.tsx";
import "./index.css";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/Signup/Signup.tsx";
import UserContextProvider from "./hooks/useUser.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <App />
      </UserContextProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: (
      <UserContextProvider>
        <SignUp />
      </UserContextProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
