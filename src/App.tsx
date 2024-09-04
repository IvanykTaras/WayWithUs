import React from 'react';
import { Hero } from './components/custom/Hero';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/custom/Header';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
