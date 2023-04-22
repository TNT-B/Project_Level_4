import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homescreen from './Screen/Homescreen';
import Tuyendungscreen from './Screen/Tuyendungscreen';
import Testlist from './Screen/TestList';


const App = () => {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Homescreen />}/>
  <Route path='/vitrituyendung' element={<Tuyendungscreen />}/>
  <Route path='/quanlibaitest' element={<Testlist/>}/>
 </Routes>
 </BrowserRouter>
  );
};
export default App;