import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Login from './Components/Login/Login';
import Signup from './Components/signup/signup';
import Home from './Components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user, setLoginUser] = useState({})
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           
          
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Home' element={<Home/>} />
            
        </Routes>
        <ToastContainer></ToastContainer >
      </BrowserRouter>
    </div>
  );
}

export default App;