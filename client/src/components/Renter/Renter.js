import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCar from "./AddCar";
import CarList from "./CarList";
import { getAllCarList } from "../../store/renterCredentials-actions";

const Renter = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return history("/signin");
    }
    dispatch(getAllCarList());
  }, [dispatch, history]);
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
                <AddCar />
                <br></br>
              </div>

              <div
                className="col-lg-6 order-1  order-lg-2 header-img"
                style={{ marginTop: "20px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555532686-d0fccaccadcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                  alt="imglogo"
                  className="img-fluid animated"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div className="row">
            <CarList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Renter;
