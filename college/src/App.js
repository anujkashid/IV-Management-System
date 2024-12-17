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
import Agenda from './Components/Agenda';
import PendingVisit from './Components/PendingVisits';
import RejectedVisit from './Components/RejectedVisit';
import TotalVisit from './Components/TotalVisits';
import CancelledVisit from './Components/CancelledVisit';
import UpdateProfile from './Components/Update_profile';

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
         <Route path='/notifications' element={<Notification></Notification>}/>
         <Route path="/gallery" element={<Gallery></Gallery>}/>
         <Route path="/register" element={<College_registration/>}/>
         <Route path="/pendingfees" element={<PendingFee/>}/>
         <Route path="/agenda" element={<Agenda/>}/>
         <Route path="/totalvisit" element={<TotalVisit/>}/>
         <Route path="/pendingvisit" element={<PendingVisit/>}/>
         <Route path="/rejectedvisit" element={<RejectedVisit/>}/>
         <Route path="/visitcancelled" element={<CancelledVisit/>}/>
         <Route path='/update_profile' element={<UpdateProfile/>}/>
         
      </Routes>
      </BrowserRouter>
  );
}

export default App;
