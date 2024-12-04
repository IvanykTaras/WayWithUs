import React, { createContext, useContext, useEffect, useState } from 'react';
import { Hero } from './components/custom/Hero';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from './components/custom/Header';
import { Theme } from '@radix-ui/themes/dist/cjs/components/theme';
import { AuthModal } from './components/AuthModal';
import { Value } from '@radix-ui/themes/dist/cjs/components/data-list';
import { IGoogleUser } from './interfaces/IGoogleUser';
import { Footer } from './components/custom/Footer';
import TravelForm from './components/TravelForm';
import { Loadding } from './components/custom/Loadding';
import { IdentityApi } from './services/IdentityApi';
import { Button } from 'react-bootstrap';
import { AxiosError } from 'axios';
import context from 'react-bootstrap/esm/AccordionContext';
import { TripPlan } from './interfaces/TripPlan';
import { TripPlanApi } from './services/TripPlanApi';
import { AsyncAction } from './utils';
import { UserApi } from './services/UserApi';

export const dataContext = createContext<Array<{value:any,set:any}>>([]);

export enum DataEnum{
    AuthModalShow,
    User,
    IsUser,
    Loadding,
    Trips,
    DownloadTrips,
    Users
}

function App() {
  const [authModalShow, setAuthModalShow] = useState(false); 
  const [user, setUser] = useState<IGoogleUser | undefined>();
  const [isUser, setIsUser] = useState<boolean>(false); 
  const [loadding, setLoadding] = useState<boolean>(false);
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [downloadTrips, setDownloadTrips] = useState<boolean>(false);
  const [users, setUsers] = useState<IGoogleUser[]>([]);

  const data = [
    {
      value: authModalShow,
      set: setAuthModalShow
    },
    {
      value: user,
      set: setUser
    },
    {
      value: isUser,
      set: setIsUser
    },
    {
      value: loadding,
      set: setLoadding
    },
    {
      value: trips,
      set: setTrips
    },
    {
      value: downloadTrips,
      set: setDownloadTrips
    },
    {
      value: users,
      set: setUsers
    }
  ]; 



  useEffect(()=>{
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
       setAuthModalShow(true);
    }   
  },[isUser]);



  
  useEffect(() => {
    if(downloadTrips){
      (async () => {   
        await AsyncAction(setLoadding, async () => {
          try {
            await toast.promise( 
              async () => {
                const trips: TripPlan[] = await TripPlanApi.get();
                const users: IGoogleUser[] = await UserApi.getUsers();
                setTrips(trips)
                setUsers(users)
              },
              {
                pending: 'load trips',
                success: 'trips downloaded 👌',
                error: 'some error 🤯'
              }
            );
          } catch (error) {
            const e = error as AxiosError;
            console.error(error)
            toast.error(e.code);
            toast.error(e.message);
          }
        });
      })();
    }
  }, [downloadTrips]);



  const login = async ()=>{
    const data = await IdentityApi.login({
      email: "test@test.test",
      password: "test"
    })

    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    console.dir(data);
  }



  return (
    <dataContext.Provider value={data}>
    <ToastContainer />
    <div className="app">
      <Theme radius='large' scaling='110%' >
      {/* <Theme accentColor="red" grayColor="sand" panelBackground="solid" radius="full" appearance='dark'> */}
        <Header/>
        {loadding ? <Loadding/> : <Outlet/>}
        {/* <TravelForm/> */}
        <AuthModal
          show={authModalShow}
          handleClose={() => setAuthModalShow(false)}
        />
        <Footer/>
      </Theme>
    </div>
    </dataContext.Provider>
  );
}



export default App;
