import React, { useState, useEffect } from "react";
import { sendSignupFormData } from "../../store/renterCredentials-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Signup = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = user;
    if (!name || !email || !password || !passwordConfirm) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    if (password !== passwordConfirm) {
      return toast.error(`Password does not match`, { position: "top-center" });
    }
    await dispatch(sendSignupFormData(user));
    if (localStorage.getItem("signup")) {
      history("/signin");
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
                <h1>Renter SignUp</h1>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      required
                      value={user.name}
                      onChange={handleInputs}
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      aria-describedby="nameHelp"
                    />
                  </div>
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
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
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
                  <div className="form-group">
                    <label htmlFor="passwordConfirm">passwordConfirm</label>
                    <input
                      required
                      value={user.passwordConfirm}
                      onChange={handleInputs}
                      name="passwordConfirm"
                      type="password"
                      className="form-control"
                      id="passwordConfirm"
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                </form>
              </div>

              <div
                className="col-lg-6 order-1  order-lg-2 header-img"
                style={{ marginTop: "20px" }}
              >
                <img
                  src="https://webneel.com/wallpaper/sites/default/files/images/07-2013/8%20koenigsegg%20car%20hd%20wallpaper.jpg"
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

export default Signup;
