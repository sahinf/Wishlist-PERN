import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import activeUser from "./custom_hooks/activeUser";
import token from "./custom_hooks/getToken";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import urls from "../URLs";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Navbar.css";

const { wishlistCountURL } = urls;

//! Used to be Navbar = (props) => {}
const Navbar = (props) => {

	const { display, count } = props;

	const [currentUser, setCurrentUser] = useState({ user_id: "", user_name: "" });
	const [cartNumber, setCartNumber] = useState(0);

	const searchIconStyle = { fontSize: "1.5rem" };

	//! REMOVE wishlist items count
	// useEffect(() => {
	// 	const cartCount = async () => {
	// 		try {
	// 			const { data } = await axios({
	// 				method: "get",
	// 				url: wishlistCountURL(),
	// 				headers: {
	// 					token: token(),
	// 				},
	// 			});

	// 			setCartNumber(data.count);
	// 		} catch (e) {
	// 			// alert(e.message);
	// 		}
	// 	};

	// 	cartCount();
	// }, [count]);

	useEffect(() => {
		const showCurrentUserAndWishlistCount = async () => {
			//* Get user_id from token in local storage
			const user = await activeUser();
			console.log("navbar user: ", user);


			setCurrentUser({ ...user });
			console.log(JSON.stringify(currentUser));
			try {
				const { data } = await axios({
					method: "post",
					url: wishlistCountURL(),
					data: {
						users_id: user
					}
				});
				setCartNumber(data.count);
			} catch (e) {
				// alert(e.message);
			}
		};

		showCurrentUserAndWishlistCount();
	}, []);

	return (
		<nav className="container-navbar" style={{ display: display }}>
			{/* <nav className="container-navbar"> */}

			{/* //* Amazon Logo */}
			<NavLink to="/">
				<img
					src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/large-images-amazon-png-logo-vector-7.png3ft3d1416935166817"
					alt="amazon-logo"
					className="amazon-logo"
				/>
			</NavLink>

			{/* //! DISABLED SEARCH BAR */}
			{/* <div className="search" tabindex="1">
				<input type="text" />
				<button>
					<i className="ion-ios-search-strong" style={searchIconStyle}></i>
				</button>
			</div> */}

			{/* //! DISABLED OLD LINK */}
			<div className="options account">
				{currentUser.name ? (<small> Hello, <span>{currentUser.name}</span> </small>)
					: (<small> <Link to="/login">LOGIN NOW</Link> </small>)}
				{/* <b>account</b> */}
			</div>

			<NavLink to="/carrier-shipping" className="options account">Carrier Shipping</NavLink>

			<NavLink to="/employees" className="options account">Employees</NavLink>

			<NavLink to="/manufacturer" className="options account">Manufacturers</NavLink>


			{/* //* Link to Wishlist */}
			<NavLink to="/am/cart" className="options ForCart">
				<ShoppingCartIcon></ShoppingCartIcon>
				<span>{cartNumber}</span>
			</NavLink>
			{currentUser.name && (
				<div
					className="options"
					style={{ fontSize: "80%" }}
					onClick={() => {
						localStorage.removeItem("token");
						window.location = "/";
					}}
				>
					log out
				</div>
			)}
			<Outlet />
		</nav>
	);
};

function mapStateToProps(state) {
	const { isCount } = state;

	return {
		count: isCount,
	};
}

export default connect(mapStateToProps)(Navbar);