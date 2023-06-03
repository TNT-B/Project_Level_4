import { BrowserRouter, Route, Routes } from "react-router-dom";

// CSS
import "./App.css";
import "./assets/css/style.css";
import "./assets/css/typography.css";
import "./assets/css/shortcodes/shortcodes.css";
import "./assets/css/style.css";
import "./assets/css/color/color-1.css";

import LandingPage from "./LandingPage/LandingPage";
import Login from "./Auth/Login";
import Admin from "./Admin/Admin";
import TestQuestion from "./Question/TestQuestion";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/questions/:id" element={<TestQuestion />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
