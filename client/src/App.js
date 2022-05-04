import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./components/Homepage"
import Login from "./components/Login"
import "./css/App.css"

import { useDisplayToggle } from "./components/custom_hooks/navDisplay"

import activeUser from "./components/custom_hooks/activeUser"
import Profile from "./components/Profile"

import urls from './URLs'

//* Generic pages to automate each CRUD page
import GenericPage from "./components/Generics/GenericPage"
import GenericItem from "./components/Generics/GenericItem"

//* Specific pages for components that are EXTRA
import CarrierPage from "./components/CarrierPage"
import AddEmployee from "./components/Employee/AddEmployee"
import AddManufacturer from "./components/Manufacturer/addManufacturer"
import AddMembership from "./components/Membership/AddMembership"
import MembershipItem from "./components/Membership/MembershipItem"
import AddReview from "./components/Reviews/AddReview"
import ReviewItem from "./components/Reviews/ReviewsItem"
import AddComplaint from "./components/Complaints/AddComplaints"
import ComplaintsItem from "./components/Complaints/ComplaintsItem"
import AddAccount from "./components/Account/AddAccount"
import AccountItem from "./components/Account/AccountItem"
import AddWishlist from "./components/Wishlist/addWishlist"
import WishlistItem from "./components/Wishlist/WishlistItem"
import WishlistPage from "./components/Wishlist/WishlistPage"


function App() {
  const [currentUser, setUser] = useState(0)

  const [display, DisplaySetNone, DisplaySetFlex] = useDisplayToggle("flex")

  useEffect(() => {
    const updateCurrentUser = async () => {
      //* Get user_id from token in local storage
      const user = await activeUser()
      console.log('App: user will be', user)

      setUser(user)
      console.log('App: user is', currentUser)
      console.log(JSON.stringify(currentUser))
    }

    updateCurrentUser()
  }, [currentUser])

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
      pk: 'users_id',
    },
    user: currentUser,
    userType: 'admin'
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
    },
    user: currentUser,
    userType: 'admin'
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
    },
    user: currentUser,
    userType: 'admin'
  }

  const revInfo = {
    path: '/reviews/*',
    head_path: '/reviews',
    head_title: 'Your Reviews!',

    addInfo: {
      label1: 'Product ID',
      placeholder1: '<number>',
      label2: 'Review Rating',
      placeholder2: '<number>',
      label3: 'Your Review',
      placeholder3: '<text>'
    },

    displayInfo: {
      one: 'product_id',
      two: 'review_rating',
      three: 'review_text'
    },

    urls: {
      getURL: urls.getRevURL(currentUser),
      putURL: urls.putRevURL(),
      delURL: urls.delRevURL()
    },
    crud: {
      table: 'reviews',
      pk: 'review_id',
    },

    userType: 'user',
    user: currentUser,
  }

  const compInfo = {
    path: '/complaints/*',
    head_path: '/complaints',
    head_title: 'Your Complaints >:(',

    addInfo: {
      label1: 'Complaint ID',
      placeholder1: '<number>',
      label2: 'Review Rating',
      placeholder2: '<number>',
      label3: 'Your Review',
      placeholder3: '<text>'
    },

    displayInfo: {
      one: 'users_id',
      two: 'users_password',
      three: 'undefined'
    },

    urls: {
      getURL: urls.getComURL('complaint'),
      putURL: urls.putComURL(),
      delURL: urls.delComURL()
    },
    crud: {
      table: 'complaint',
      pk: 'complaint_id',
    },

    userType: 'user',
    user: currentUser,
  }


  const accInfo = {
    path: '/account/*',
    head_path: '/account',
    head_title: 'Your Sexy Profile Page ;)',

    urls: {
      getURL: urls.getAccURL('users'),
      putURL: urls.putComURL(),
      delURL: urls.delComURL()
    },
    displayInfo: {
      one: 'users_id',
      two: 'users_password',
      three: 'undefined'
    },
    crud: {
      table: 'users',
      pk: 'users_id',
    },

    userType: 'user',
    user: currentUser,
  }

  const wishlistInfo = {
    path: '/wishlist/*',
    head_path: '/wishlist',
    head_title: 'Your wishlist is looking kinda expensive O_O',

    urls: {
      // getURL: urls.getAccURL('users'),
      // putURL: urls.putComURL(),
      // delURL: urls.delComURL()
      getURL : urls.wishlistGetURL(currentUser),
      putURL : urls.wishlistPutURL(),
      insURL : urls.wishlistInsertURL(),
      delURL : urls.wishlistDelURL()
    },
    displayInfo: {
      one: 'users_id',
      two: 'product_id',
      three: undefined
    },
    crud: {
      table: 'wishlist',
      pk: 'users_id',
    },

    userType: 'user',
    user: currentUser,
  }

  //** INSANE CODE REUSE IN ACTION HERE
  return (
    <div className="App" >
      <Navbar display={display} currentUser={currentUser} />
      <Routes>
        <Route index element={<Homepage DisplaySetFlex={DisplaySetFlex} />} />
        <Route path='/login' element={<Login DisplaySetNone={DisplaySetNone} setUser={setUser} />} />
        <Route path='/profile' element={<Profile DisplaySetFlex={DisplaySetFlex} />} />
        <Route path='/carrier-shipping/*' element={<CarrierPage />} />
        <Route path={empInfo.path} element={<GenericPage genericInfo={empInfo} ItemComponent={GenericItem} AddComponent={AddEmployee} />} />
        <Route path={manInfo.path} element={<GenericPage genericInfo={manInfo} ItemComponent={GenericItem} AddComponent={AddManufacturer} />} />
        <Route path={memInfo.path} element={<GenericPage genericInfo={memInfo} ItemComponent={MembershipItem} AddComponent={AddMembership} />} />
        <Route path={revInfo.path} element={<GenericPage genericInfo={revInfo} ItemComponent={ReviewItem} AddComponent={AddReview} />} />
        <Route path={compInfo.path} element={<GenericPage genericInfo={compInfo} ItemComponent={ComplaintsItem} AddComponent={AddComplaint} />} />
        <Route path={accInfo.path} element={<GenericPage genericInfo={accInfo} ItemComponent={AccountItem} AddComponent={AddAccount} />} />
        <Route path={wishlistInfo.path} element={<WishlistPage genericInfo={wishlistInfo} ItemComponent={WishlistItem} AddComponent={AddWishlist} />} />


      </Routes>
    </div >
  )
}

export default App