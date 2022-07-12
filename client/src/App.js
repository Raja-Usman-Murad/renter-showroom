import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import UpdatePassword from "./components/authentication/UpdatePassword";
import UpdateUser from "./components/authentication/UpdateUser";
import Renter from "./components/Renter/Renter";
import ShowRoomCars from "./components/customer/ShowRoomCars";
import Error from "./components/Error";
import CheckoutPage from "./components/customer/CheckoutPage";
import Thankyou from "./components/customer/Thankyou";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/updateMyPassword" element={<UpdatePassword />} />
        <Route path="/updateRenterInfo" element={<UpdateUser />} />
        <Route path="/renter" element={<Renter />} />
        <Route path="/carList" element={<ShowRoomCars />} />
        <Route path="/car/:id" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
