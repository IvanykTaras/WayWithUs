import React from 'react';
import ReactDOM from 'react-dom/client';
import "./normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateTrip } from './components/CreateTrip';
import { Header } from './components/custom/Header';





const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
