import Register from "./pages/Register"
import "./style.scss"
import Home from "./pages/Home";
import Login from "./pages/Login";
import {BrowserRouter,Route,Navigate,Routes} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const currentUser = useContext(AuthContext)
  console.log((currentUser.currentUser));
  const ProtectedRoute = ({children}) => {
    if(currentUser.currentUser==null)
    {
      //console.log("anand");
      return <Navigate to ="/login"/>
    }
   return children;
  };
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute> }></Route>
      <Route path ="/login" element={<Login/>}></Route>
      <Route path ="/register" element={<Register/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
