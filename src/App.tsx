import React, { createContext, useContext, useEffect, useState } from 'react';
import { Hero } from './components/custom/Hero';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/custom/Header';
import { Theme } from '@radix-ui/themes/dist/cjs/components/theme';
import { AuthModal } from './components/AuthModal';
import { Value } from '@radix-ui/themes/dist/cjs/components/data-list';
import { IGoogleUser } from './interfaces/IGoogleUser';
import { Footer } from './components/custom/Footer';
import TravelForm from './components/TravelForm';
import { Loadding } from './components/custom/Loadding';

export const dataContext = createContext<Array<{value:any,set:any}>>([]);

export enum DataEnum{
    AuthModalShow,
    User,
    IsUser,
    Loadding
}

function App() {
  const [authModalShow, setAuthModalShow] = useState(false); 
  const [user, setUser] = useState<IGoogleUser | undefined>();
  const [isUser, setIsUser] = useState<boolean>(false); 
  const [loadding, setLoadding] = useState<boolean>(false);

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
    }
  ]; 



  useEffect(()=>{
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
       setAuthModalShow(true);
    }   
  },[isUser]);


  return (
    <dataContext.Provider value={data}>
    <div className="app">
      <Theme radius='large' scaling='110%' >
      {/* <Theme accentColor="red" grayColor="sand" panelBackground="solid" radius="full" appearance='dark'> */}
        <ToastContainer />
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
