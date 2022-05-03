import { useState, useEffect } from "react";
//! Switch -> Route, Redirect -> Navigate
import { Routes, Route, Navigate, BrowserRouter, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import "./css/App.css";

import { useDisplayToggle } from "./components/custom_hooks/navDisplay";

import activeUser from "./components/custom_hooks/activeUser";
import Profile from "./components/Profile";
import CarrierShipping from "./components/CarrierPage";

function App() {
  const [user, setUser] = useState({});
  const [display, DisplaySetNone, DisplaySetFlex] = useDisplayToggle("flex");

  useEffect(() => {
    async function getUser() {
      try {
        setUser(await activeUser());
      } catch (e) { }
    }

    getUser();
  }, []);

  function TestComponent() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Home View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }

  //! Non nested login path works, nested does not work!
  return (
    <div className="App">
      <Navbar display={display} />
      <Routes>
        <Route index element={<Homepage DisplaySetFlex={DisplaySetFlex} />} />
        <Route path='/login' element={<Login DisplaySetNone={DisplaySetNone} />} />
        <Route path='/profile' element={<Profile DisplaySetFlex={DisplaySetFlex}/>} />
        <Route path='/carrier-shipping/*' element={<CarrierShipping DisplaySetFlex={DisplaySetFlex}/>} />
      </Routes>
    </div >
  );
}

export default App;