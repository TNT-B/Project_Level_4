import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Login from './Auth/Login';
import Admin from './Admin/Admin';


const App = () => {
  return (
 <BrowserRouter>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/admin' element={<Admin/>}/>
  </Routes>
 </BrowserRouter>
  );
};
export default App;