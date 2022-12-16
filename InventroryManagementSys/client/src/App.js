import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Error/>} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
