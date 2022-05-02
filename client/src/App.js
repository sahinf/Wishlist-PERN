import { useState, useEffect } from "react";
//! Switch -> Route, Redirect -> Navigate
import { Routes, Route, Navigate, BrowserRouter, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import OneItemPage from "./components/OneItemPage";
import Cart from "./components/AmazonCart";
import Login from "./components/Login";
import "./css/App.css";

import { useDisplayToggle } from "./components/custom_hooks/navDisplay";

import activeUser from "./components/custom_hooks/activeUser";

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

  return (
    <div className="App">
      <Navbar display={display} />
      <Routes>
        <Route path='/' element={<Homepage DisplaySetFlex={DisplaySetFlex} />}>
          {/* <Route path='login' element={<TestComponent />} /> */}
          <Route path='/login' element={<Login DisplaySetNone={DisplaySetNone} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;