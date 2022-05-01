import { useState, useEffect } from "react";
//! Switch -> Route, Redirect -> Navigate
import { Route, Navigate } from "react-router-dom";
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
			} catch (e) {}
		}

		getUser();
	}, []);

	return (
		<div className="App">
			<Navbar display={display} />
			<Switch>
				<Route
					exact
					path="/"
					render={(arg) => (
						<Homepage {...arg} DisplaySetFlex={DisplaySetFlex} />
					)}
				/>
				<Route
					exact
					path="/login"
					render={(arg) => <Login {...arg} DisplaySetNone={DisplaySetNone} />}
				/>

				<Route
					exact
					path="/:id"
					render={(arg) => (
						<OneItemPage {...arg} DisplaySetFlex={DisplaySetFlex} />
					)}
				/>
				<Route
					exact
					path="/am/cart"
					render={(props) => {
						if (!user) {
							return (
								<Redirect
									to={{
										pathname: "/login",

										state: { from: props.location },
									}}
								/>
							);
						}

						return <Cart {...props} DisplaySetFlex={DisplaySetFlex} />;
					}}
				/>
			</Switch>
		</div>
	);
}

export default App;

// import Footer from './components/Footer';
// import Header from './components/Header';
// import Login from './components/Login';

// import './css/App.css';

// const App = () => (
//   <>
//     {/* <Header></Header> */}
//     <main style={{ minHeight: "93vh" }}>
//       <Login> </Login>
//     </main>
//     {/* <Footer></Footer> */}
//   </>
// );

// export default App