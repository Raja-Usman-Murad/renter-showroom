import React from "react";
import CustomerForm from "./customer/CustomerForm";
import Image from "./customer/Image";

const Home = () => {
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
                <CustomerForm />
              </div>

              <div
                className="col-lg-6 order-1  order-lg-2 header-img"
                style={{ marginTop: "20px" }}
              >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Image />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
