import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login';
import Signup from './Components/signup/signup';
import Home from './Components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verifying from './Components/Verifying/Verifying';
import Game from './Components/games/Game';




function App() {

 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/verify' element={<Verifying />} />
          <Route path='/games' element={<Game />} />

        </Routes>
        <ToastContainer></ToastContainer >
      </BrowserRouter>
    </div>
  );
}

export default App;