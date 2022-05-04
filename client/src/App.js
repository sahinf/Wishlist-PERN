import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import "./css/App.css";

import { useDisplayToggle } from "./components/custom_hooks/navDisplay";

import activeUser from "./components/custom_hooks/activeUser";
import Profile from "./components/Profile";

import urls from './URLs'

//* Generic pages to automate each CRUD page
import GenericPage from "./components/Generics/GenericPage";
import GenericAddItem from "./components/Generics/GenericAddItem";
import GenericItem from "./components/Generics/GenericItem";

//* Specific pages for components that are EXTRA
import CarrierPage from "./components/CarrierPage";
import AddEmployee from "./components/Employee/AddEmployee";
import AddManufacturer from "./components/Manufacturer/addManufacturer";
import addMembership from "./components/Membership/AddMembership";
import MembershipItem from "./components/Membership/MembershipItem";

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
      getURL: urls.getEmpURL('employee'),
      putURL: urls.putEmpURL(),
      delURL: urls.delEmpURL()
    },
    crud: {
      table: 'employee',
      pk: 'users_id'
    }
  }

  //! Begin trying GENERICS here
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

    //! GET RID OF THIS IN FAVOR OF REAL MAP
    displayInfo: {
      one: 'man_id',
      two: 'seller_name',
      three: 'users_id'
    },

    urls: {
      getURL: urls.getManURL('manufacturer'),
      putURL: urls.putManURL(),
      delURL: urls.delManURL()
    },
    crud: {
      table: 'manufacturer',
      pk: 'man_id',
    }
  }

  const memInfo = {
    path: '/membership/*',
    head_path: '/membership',
    head_title: 'Memberships of Customers',

    addInfo: {
      label1: 'Membership ID',
      placeholder1: '<number>',
      label2: 'Customer ID',
      placeholder2: '<number>',
      label3: 'Membership Status',
      placeholder3: 'Type of membership'
    },

    displayInfo: {
      one: 'users_id',
      two: 'users_customer_id',
      three: 'membership_status'
    },

    urls: {
      getURL: urls.getMemURL('membership'),
      putURL: urls.putMemURL(),
      delURL: urls.delMemURL()
    },
    crud: {
      table: 'membership',
      pk: 'membership_id',
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
        <Route path={empInfo.path} element={<GenericPage genericInfo={empInfo} ItemComponent={GenericItem} AddComponent={AddEmployee} />} />
        <Route path={manInfo.path} element={<GenericPage genericInfo={manInfo} ItemComponent={GenericItem} AddComponent={AddManufacturer} />} />
        <Route path={memInfo.path} element={<GenericPage genericInfo={memInfo} ItemComponent={MembershipItem} AddComponent={addMembership} />} />

      </Routes>
    </div >
  );
}

export default App;