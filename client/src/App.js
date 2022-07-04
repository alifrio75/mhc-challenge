import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/dashboard/dashboard";
import Login from "./components/login/Login"
import { useEffect } from "react";
import { onLogin, userState } from "./store/user.slice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector(userState)
  const dispatch = useDispatch()

  useEffect(()=> dispatch(onLogin()),[])

  const protectRoute = (elm) => {
    if (user) {
      return user.loggedIn ? elm : <Login />
    } else {
      return <Login />
    }
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={protectRoute(<Dashboard></Dashboard>)} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
