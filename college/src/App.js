import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homecomponent from './Components/Homecomponent';
import Login from './Components/Login';
import ForgetPasswordComponent from './Components/ForgotPassword';
import ColLogin from './Components/CollgeVisit';
import Feedback from './Components/Feedback';
import About from './Components/About';
import Profile from './Components/Profile';
import Notification from './Components/Notiication';
import Gallery from './Components/Gallery';
import College_registration from './Components/College_registration';
import PendingFee from './Components/PendingFee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/home" element={<Homecomponent/>} />
         <Route path="/" element={<Login/>} />
         <Route path="/forget" element={<ForgetPasswordComponent/>}/>
         <Route path="/addvisit" element={<ColLogin/>} />
         <Route path="/feedback" element={<Feedback/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path='/notification' element={<Notification></Notification>}/>
         <Route path="/gallery" element={<Gallery></Gallery>}/>
         <Route path="/register" element={<College_registration/>}/>
         <Route path="/pendingfee" element={<PendingFee/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
