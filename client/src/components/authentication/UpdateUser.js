import React, { useEffect, useState } from "react";
import {
  getRenterUser,
  updateRenterInfo,
} from "../../store/renterCredentials-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UpdateUser = () => {
  const renterUserData = useSelector(
    (state) => state.renterCredentials.renterUserData
  );
  const history = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: renterUserData.name,
    email: renterUserData.email,
  });

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email } = user;
    if (!name || !email) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    await dispatch(updateRenterInfo(user));
    if (localStorage.getItem("token")) {
      history("/renter");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return history("/signin");
    }
    setUser({
      name: renterUserData.name,
      email: renterUserData.email,
    });
    dispatch(getRenterUser());
  }, [dispatch, history, renterUserData.name, renterUserData.email]);
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
                <h1>Update Renter Info</h1>
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
                  src="https://wallpaperaccess.com/full/562182.jpg"
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

export default UpdateUser;
