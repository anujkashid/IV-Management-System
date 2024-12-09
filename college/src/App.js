import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homecomponent from './Components/Homecomponent';
import Login from './Components/Login';
import ForgetPasswordComponent from './Components/ForgotPassword';
import ColLogin from './Components/CollgeVisit';
import Feedback from './Components/Feedback';

function App() {
  return (
    <BrowserRouter>

      <Routes>
         <Route path="/home" element={<Homecomponent/>} />
         <Route path="/" element={<Login/>} />
         <Route path="/forget" element={<ForgetPasswordComponent/>}/>
         <Route path="/addvisit" element={<ColLogin/>} />
         <Route path="/feedback" element={<Feedback/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
