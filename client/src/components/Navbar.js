import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Navbar = () => {
  const history = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("signup");
    history("/signin");
    toast.warn("Logout Successfully!", { position: "top-center" });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand btn btn-secondary mr-5" to="/">
          Renter
        </NavLink>
        <button
          className="navbar-toggler"
          type="butn"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className=" btn btn-primary mx-2" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className=" btn btn-primary mx-2" to="/carList">
                CarsShowroom <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <div className=" my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              {!localStorage.getItem("token") ? (
                <>
                  <li className="nav-item active">
                    <NavLink className=" btn btn-primary mx-2" to="/signin">
                      Signin <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className=" btn btn-primary mx-2" to="/signup">
                      Signup <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <NavLink className=" btn btn-success mx-2" to="/renter">
                      Add Rental CAR <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink
                      className=" btn btn-primary mx-2"
                      to="/updateMyPassword"
                    >
                      UpdatePassword <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink
                      className="btn btn-primary mx-2"
                      to="/updateRenterInfo"
                    >
                      updateRenterInfo{" "}
                      <span className="sr-only">(current)</span>
                    </NavLink>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={logoutHandler}
                    >
                      LogOut <span className="sr-only">(current)</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
