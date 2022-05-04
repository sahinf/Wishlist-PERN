import React, { useState, useEffect } from "react"
import { NavLink, Link, Outlet } from "react-router-dom"
import activeUser from "./custom_hooks/activeUser"
import token from "./custom_hooks/getToken"
import axios from "axios"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import urls from "../URLs"
import { connect } from "react-redux"
import "bootstrap/dist/css/bootstrap.css"
import "../css/Navbar.css"
import logo from "./bamazon.png"

const { wishlistCountURL } = urls

const Navbar = (props) => {

	const { display, count } = props

	const [cartNumber, setCartNumber] = useState(0)
	const [currentUser, setCurrentUser] = useState({ user_id: "", user_name: "" })

	useEffect(() => {
		const showWishListCount = async () => {
			try {
				const usr = await activeUser()
				setCurrentUser(usr)
				const { data } = await axios({
					method: "post",
					url: wishlistCountURL(),
					data: {
						users_id: usr
					}
				})
				setCartNumber(data.count)
			} catch (e) {
				// alert(e.message)
			}
		}
		showWishListCount()
	}, [])

	const isEmployee = () => {
		if (currentUser >= 20) {
			console.log('Current user is an admin: ', currentUser)
			return true
		}
		console.log('Current user is a pleb: ', currentUser )
		return false
	}

	const admin = isEmployee()

	return (
		<nav className="container-navbar" style={{ display: display }}>

			{/* Bamazon Logo */}
			<NavLink to="/">
				<img src={logo} alt="amazon-logo" className="amazon-logo" />
			</NavLink>


			<div className="options account">
				{false ? ( <p>Hello, <span>{currentUser.users_id}</span></p>)
					: ( <Link to="/login">Login</Link> )}
			</div>

			{admin ?
				<NavLink to="/carrier-shipping" className="options account">Carrier Shipping</NavLink>
				:
				<NavLink to="/reviews" className="options account">Product Reviews</NavLink>
			}

			{admin ? <NavLink to="/employees" className="options account">Employees</NavLink>
				:
				<NavLink to="/complaints" className="options account">Interface Complaints</NavLink>}

			{admin ? <NavLink to="/manufacturer" className="options account">Manufacturers</NavLink>
				:
				<NavLink to="/account" className="options account">Account Info</NavLink>}

			{admin ? <NavLink to="/membership" className="options account">Membership</NavLink>
				:
				<NavLink to="/wishlist" className="options ForCart"> <ShoppingCartIcon></ShoppingCartIcon> <span>{cartNumber}</span> </NavLink>}
			
			{(
				<div
					className="options"
					style={{ fontSize: "90%" }}
					onClick={() => {
						localStorage.removeItem("token")
						window.location = "/"
					}}
				>
					Sign Out
				</div>
			)}
			<Outlet />
		</nav>
	)
}

function mapStateToProps(state) {
	const { isCount } = state

	return {
		count: isCount,
	}
}

export default connect(mapStateToProps)(Navbar)