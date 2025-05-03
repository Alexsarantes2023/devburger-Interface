import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
import AppProvider from './hooks';
import { router } from "./routes";
import GlobalStyles from './styles/globalStyles';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer autoClose={2000} theme="colored" />
    </AppProvider>
  </React.StrictMode>,
);
