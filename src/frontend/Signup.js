import React from "react";
import Navbar from "./Navbar";


function Signup() {

    

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>

          <div className="col-lg-8 signup">
            <h1>Sign up</h1>

            <form action="/blog/signup" method="post" className="signup-form">
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

              <div className="form-group">
                <label htmlFor="password">Password Confirmation</label>
                <input
                  type="password"
                  id="confirmation"
                  name="confirmation"
                  className="form-control"
                  
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Email(Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                
                />
                
              </div>
             

              <button
                type="submit"
                className="btn btn-primary"
             
              >
               
                Sign up
              </button>
            </form>
          </div>

          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  );
}
export default Signup;
