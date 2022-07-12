import React from "react";
import { NavLink } from "react-router-dom";

const ShowRoomCarsItem = (props) => {
  return (
    <>
      <div className="col-md-4 mx-auto">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={props.car.photo}
            className="card-img-top"
            alt="CarImage"
            height="200px"
            width="300px"
          />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="badge badge-secondary">Seats</span>
              <span className="ml-3 ">{props.car.seats}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">Tyres</span>{" "}
              <span className="ml-3 ">{props.car.tires}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">FuelType</span>
              <span className="ml-3 ">{props.car.fuelType}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">Price</span>{" "}
              <span className="ml-3 ">{props.car.price}</span>
            </li>
          </ul>
          <div className="card-body">
            <NavLink
              to={`/car/${props.car._id}`}
              className="btn btn-outline-primary"
            >
              Rent This Car
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowRoomCarsItem;
