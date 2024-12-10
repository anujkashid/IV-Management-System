import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homecomponent from './Components/Homecomponent';
import Login from './Components/Login';
import ForgetPasswordComponent from './Components/ForgotPassword';
import ColLogin from './Components/CollgeVisit';
import Feedback from './Components/Feedback';
import College_registration from './Components/College_registration';
import Notification from './Components/Notiication';

function App() {
  return (
    <BrowserRouter>

      <Routes>
         <Route path="/home" element={<Homecomponent/>} />
         <Route path="/" element={<Login/>} />
         <Route path="/forget" element={<ForgetPasswordComponent/>}/>
         <Route path="/addvisit" element={<ColLogin/>} />
         <Route path="/feedback" element={<Feedback/>} />
         <Route path="/register" element={<College_registration/>}/>
         <Route path="/notifications" element={<Notification></Notification>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
