import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import About from "../pages/About";
import App from "../App";
import Contact from "../pages/Contact";
import Lipstick from "../pages/product/Lipstick";
import UserCart from "../users/UserCart";
import Blush from "../pages/product/Blush";
import Foundation from "../pages/product/Foundation";
import Eyeshadow from "../pages/product/Eyeshadow";
import Loginform from "../pages/LoginForm";


const Rounting = createBrowserRouter([
  {path:"/",element:<Loginform/>},
  { path: "app", element: <App /> },
  { path: "home", element: <Home /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },

  //products
  {path:"lipstick",element:<Lipstick/>},
  {path:"blush",element:<Blush/>},
  {path:"foundation",element:<Foundation/>},
  {path:"eyeshadow",element:<Eyeshadow/>},

  //usercart
  {path:"usercart", element:<UserCart/>}
]);





export default Rounting;
