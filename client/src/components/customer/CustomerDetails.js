import React from "react";
import { useSelector } from "react-redux";

const CustomerDetails = () => {
  const customer = useSelector((state) => state.customer.getCustomer);
  return (
    <>
      <h2>Customer Details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            value={customer.name}
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
            value={new Date(customer.pickUpDate).toLocaleDateString()}
            name="pickUpDate"
            type="text"
            className="form-control"
            id="pickUpDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="returnDate">Return Date</label>
          <input
            required
            value={new Date(customer.returnDate).toLocaleDateString()}
            name="returnDate"
            type="text"
            className="form-control"
            id="returnDate"
          />
        </div>
      </form>
    </>
  );
};

export default CustomerDetails;
