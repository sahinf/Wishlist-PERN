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

  function Ass() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Home View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Ass />} />
        </Route>
      </Routes>
      {/* <Navbar display={display} />
        <Routes>
          <Route
            path="/"
            render={(arg) => (
              <Homepage {...arg} DisplaySetFlex={DisplaySetFlex} />
            )}
          />
          <Route
            path="/login"
            render={(arg) => <Login {...arg} DisplaySetNone={DisplaySetNone} />}
          />

          <Route
            path="/:id"
            render={(arg) => (
              <OneItemPage {...arg} DisplaySetFlex={DisplaySetFlex} />
            )}
          />
          <Route
            path="/am/cart"
            render={(props) => {
              if (!user) {
                return (
                  <Link
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
        </Routes> */}
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