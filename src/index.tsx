import React from 'react';
import ReactDOM from 'react-dom/client';
import "./normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateTrip } from './components/CreateTrip';
import { Header } from './components/custom/Header';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIEND_ID_OAUTH } from './assets/ApiKeys';
import { Hero } from './components/custom/Hero';
import { TripView } from './components/TripVIew';





const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Hero/>
      },     
      {
        path:"/create-trip",
        element:<CreateTrip/>
      },
      {
        path:"/trip-view",
        element:<TripView/> 
      }
    ]
  },
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIEND_ID_OAUTH}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
