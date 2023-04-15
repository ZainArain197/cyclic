import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Login from './Components/Login/Login';
import Signup from './Components/signup/signup';
import Home from './Components/Home/Home';

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
      </BrowserRouter>
    </div>
  );
}

export default App;