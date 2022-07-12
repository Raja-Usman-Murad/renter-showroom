import React, { useEffect, useState } from "react";
import { sendSigninFormData } from "../../store/renterCredentials-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Signin = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    await dispatch(sendSigninFormData(user));
    if (localStorage.getItem("signin")) {
      history("/renter");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return history("/renter");
    }
  }, [history]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row" style={{ marginTop: "0px", height: "auto" }}>
              <div
                className="col-md-6 pt-5  mt-5 pt-lg-0 order-1 order-lg-1 d-flex  flex-column"
                style={{ marginTop: "20px" }}
              >
                <h1>Renter SignIn</h1>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      required
                      value={user.email}
                      onChange={handleInputs}
                      name="email"
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      required
                      value={user.password}
                      onChange={handleInputs}
                      name="password"
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>

              <div
                className="col-lg-6 order-1  order-lg-2 header-img"
                style={{ marginTop: "20px" }}
              >
                <img
                  src="https://wallpaperaccess.com/full/930590.jpg"
                  alt="imglogo"
                  className="img-fluid animated"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
