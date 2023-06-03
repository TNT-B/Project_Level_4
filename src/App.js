import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage/LandingPage";
import Login from "./Auth/Login";
import Admin from "./Admin/Admin";
import ThemeContextProvider from "./Admin/Context/ThemeContext";

const App = () => {
  //test
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};
export default App;
