import React from 'react';
import ReactDOM from 'react-dom/client';
import "./normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import "react-multi-carousel/lib/styles.css";
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateTrip } from './components/CreateTrip';
import { Header } from './components/custom/Header';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIEND_ID_OAUTH } from './assets/ApiKeys';
import { Hero } from './components/custom/Hero';
// import { TripView } from './components/TripVIew';
import MyTripForm from './components/MyTrips/MyTripForm';
import { MyTheme } from './components/MyTheme';
import { Theme } from '@radix-ui/themes';
import TripPlanForm from './components/custom/TripPlanForm';
import SearchForm from './components/Search/SearchForm';
import { TripDetails } from './components/tripDetails/TripDetails';
import ChatApp from './components/chat/ChatApp';





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
        element: <TripPlanForm/>
        // element:<CreateTrip/>
      },
      {
        path:"/search",
        element:<SearchForm/> 
      },
      {
        path:"/my-trips",
        element:<MyTripForm/>
      },
      {
        path:"/theme",
        element: <MyTheme/>
      },
      {
        path:"/trip/:trip_plan_id",
        element:<TripDetails/>
      },
      {
        path: "/chat/:room",
        element: <ChatApp/>
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
