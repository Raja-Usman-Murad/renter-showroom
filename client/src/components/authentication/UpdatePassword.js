import React, { useState, useEffect } from "react";
import { sendUpdatePasswordFormData } from "../../store/renterCredentials-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UpdatePassword = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { passwordCurrent, password, passwordConfirm } = user;
    if (!passwordCurrent || !password || !passwordConfirm) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    if (password !== passwordConfirm) {
      return toast.error(`Password does not match`, { position: "top-center" });
    }
    await dispatch(sendUpdatePasswordFormData(user));
    if (localStorage.getItem("updatePassword")) {
      history("/renter");
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return history("/signin");
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
                <h1>Renter UpdatePassword</h1>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="passwordCurrent">passwordCurrent</label>
                    <input
                      required
                      value={user.passwordCurrent}
                      onChange={handleInputs}
                      type="text"
                      className="form-control"
                      name="passwordCurrent"
                      id="passwordCurrent"
                      aria-describedby="nameHelp"
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
                  src="https://cdn.wallpapersafari.com/96/69/WLRzuf.jpg"
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

export default UpdatePassword;
