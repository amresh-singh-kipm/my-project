import React, { useState } from "react";
import Navbar from "./Navbar";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login() {
  // state created to store value//

  let navigate = useNavigate();
  const clientId =
    "807795441363-qjngal7d1m27ib08j4icsjo1gipu5cpv.apps.googleusercontent.com";
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  //Login fuction

  let onSuccessFullLogin = (resp) => {
    console.log("resp");
    setShowLoginButton(false);
    setShowlogoutButton(true);
    localStorage.setItem("name", resp?.profileObj?.name);
    localStorage.setItem("email", resp?.profileObj?.email);
    navigate("/");
  };

  //Logout Function

  let onSuccessFullLogout = (resp) => {
    alert("You have successfully Logout");
    setShowLoginButton(true);
    setShowlogoutButton(false);
    localStorage.clear();
  };

  let onLoginFailure = () => {
    console.log("login is unsuccessful ");
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 login">
            <h1>Login</h1>
            <form action="/blog/login" method="post" className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
              <p>
                Don't have an account?{" "}
                <NavLink to="/signup">Sign Up Now</NavLink>
              </p>
            </form>
          </div>
        </div>
        {showLoginButton ? (
          <GoogleLogin
            className="google-button"
            clientId={clientId}
            buttonText="SignIn"
            onSuccess={onSuccessFullLogin}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        ) : null}
        {showlogoutButton ? (
          <GoogleLogout
            className="google-button"
            clientId={clientId}
            buttonText="Sign Out"
            onLogoutSuccess={onSuccessFullLogout}
          />
        ) : null}
      </div>
    </>
  );
}
export default Login;
