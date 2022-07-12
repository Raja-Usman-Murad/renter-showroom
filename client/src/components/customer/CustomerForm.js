import React, { useState, useEffect } from "react";
import { createCustomer } from "../../store/customer-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const CustomerForm = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    lisenceId: "",
    age: "",
    pickUpDate: "",
    returnDate: "",
  });

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, phone, lisenceId, age, pickUpDate, returnDate } =
      customer;
    if (
      !name ||
      !email ||
      !phone ||
      !lisenceId ||
      !age ||
      !pickUpDate ||
      !returnDate
    ) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    await dispatch(createCustomer(customer));
    if (localStorage.getItem("customerToken")) {
      history("/carList");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("customerToken")) {
      return history("/carList");
    }
  }, [history]);
  return (
    <>
      <h1>Customer Details</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            value={customer.name}
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
            value={customer.email}
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
          <label htmlFor="phone">Phone Number</label>
          <input
            required
            value={customer.phone}
            onChange={handleInputs}
            name="phone"
            type="text"
            className="form-control"
            id="phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lisenceId">LisenceId</label>
          <input
            required
            value={customer.lisenceId}
            onChange={handleInputs}
            name="lisenceId"
            type="text"
            className="form-control"
            id="lisenceId"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Your Age</label>
          <input
            required
            value={customer.age}
            onChange={handleInputs}
            name="age"
            type="text"
            className="form-control"
            id="age"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickUpDate">PickUp Date</label>
          <input
            required
            value={customer.pickUpDate}
            onChange={handleInputs}
            name="pickUpDate"
            type="date"
            className="form-control"
            id="pickUpDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="returnDate">Return Date</label>
          <input
            required
            value={customer.returnDate}
            onChange={handleInputs}
            name="returnDate"
            type="date"
            className="form-control"
            id="returnDate"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </>
  );
};

export default CustomerForm;
