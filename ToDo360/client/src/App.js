import logo from "./logo.svg";
import "./App.css";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Profile1 from "./pages/Profile1";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/profile1" element={<Profile1/>} /> */}
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
