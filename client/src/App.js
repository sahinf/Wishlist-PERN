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
import CarrierPage from "./components/CarrierPage";

import GenericPage from "./components/Generics/GenericPage";
import GenericAddItem from "./components/Generics/GenericAddItem";
import GenericItem from "./components/Generics/GenericItem";


import urls from './URLs'

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

  //* Prepare specific information that will be based down to generic renderes INSANE AUTOMATION
  const empInfo = {
    path: '/employees/*',
    head_path: '/employees',
    head_title: 'Employees',
    addInfo: {
      label1: 'Employee ID',
      placeholder1: '<number 20+>',
      label2: 'Employee First Name',
      placeholder2: 'First Name',
      label3: 'Employee Last Name',
      placeholder3: 'Last Name'
    },
    displayInfo: {
      one: 'users_id',
      two: 'employee_fname',
      three: 'employee_lname'
    },
    urls: {
      getURL : urls.employeesURL(),
      putURL : urls.employeesURL(),
      delURL : urls.employeesURL()
    }
  }
  const manInfo = {
    path: '/manufacturer/*',
    head_path: '/manufacturer',
    head_title: 'Manufacturers',
    addInfo: {
      label1: 'Manufacturer ID',
      placeholder1: '<number>',
      label2: 'Seller Name',
      placeholder2: 'Name of seller',
      label3: 'Employee ID',
      placeholder3: '<number>'
    },
    displayInfo: {
      one: 'man_id',
      two: 'seller_name',
      three: 'users_id'
    },
    urls: {
      getURL : urls.getManURL(),
      putURL : urls.putManURL(),
      delURL : urls.delManURL()
    }
  }

  //** INSANE CODE REUSE IN ACTION HERE
  return (
    <div className="App">
      <Navbar display={display} />
      <Routes>
        <Route index element={<Homepage DisplaySetFlex={DisplaySetFlex} />} />
        <Route path='/login' element={<Login DisplaySetNone={DisplaySetNone} />} />
        <Route path='/profile' element={<Profile DisplaySetFlex={DisplaySetFlex} />} />
        <Route path='/carrier-shipping/*' element={<CarrierPage />} />
        <Route path={empInfo.path} element={<GenericPage genericInfo={empInfo} ItemComponent={GenericItem} AddComponent={GenericAddItem} />} />
        <Route path={manInfo.path} element={<GenericPage genericInfo={manInfo} ItemComponent={GenericItem} AddComponent={GenericAddItem} />} />
      </Routes>
    </div >
  );
}

export default App;