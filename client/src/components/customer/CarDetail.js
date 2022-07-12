import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CarDetail = () => {
  const car = useSelector((state) => state.customer.getCar);
  console.log(car, "car");
  return (
    <>
      <h2>Car Details</h2>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={car.photo}
          className="card-img-top"
          alt="CarImage"
          height="200px"
          width="300px"
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="badge badge-secondary">Seats</span>
            <span className="ml-3 ">{car.seats}</span>
          </li>
          <li className="list-group-item">
            <span className="badge badge-secondary">Tyres</span>{" "}
            <span className="ml-3 ">{car.tires}</span>
          </li>
          <li className="list-group-item">
            <span className="badge badge-secondary">FuelType</span>
            <span className="ml-3 ">{car.fuelType}</span>
          </li>
          <li className="list-group-item">
            <span className="badge badge-secondary">Price</span>{" "}
            <span className="ml-3 ">{car.price}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CarDetail;
