import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homescreen from './Screen/Homescreen';
import Tuyendungscreen from './Screen/Tuyendungscreen';
import Testlist from './Screen/TestList';
import TestNew from './Screen/TestNew';
import TuyendungList from './Screen/TuyendungList';
import TuyendungNew from './Screen/TuyendungNew';
import TuyendungDetail from './Screen/TuyendungDetail';
import TestDetail from './Screen/TestDetails';


const App = () => {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Homescreen />}/>
  <Route path='/vitrituyendung' element={<Tuyendungscreen />}/>
  <Route path='/quanlibaitest' element={<Testlist/>}/>
  <Route path='/quanlituyendung' element={<TuyendungList/>}/>
  <Route path='/themmoibaitest' element={<TestNew/>}/>
  <Route path='/themmoituyendung' element={<TuyendungNew/>}/>
  <Route path='/chitiettuyendung' element={<TuyendungDetail/>}/>
  <Route path='/chitietbaitest' element={<TestDetail/>}/>
  
 </Routes>
 </BrowserRouter>
  );
};
export default App;