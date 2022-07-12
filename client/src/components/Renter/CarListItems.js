import React from "react";
import { deleteCar } from "../../store/renterCredentials-actions";
import { useDispatch } from "react-redux";

const CarListItems = (props) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteCar(id));
    // window.location.reload(false);
  };
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
          <div className="card-body">
            <h5 className="card-title">EDIT/Delete Car</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="badge badge-secondary">Seats</span>{" "}
              {props.car.seats}
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">Tyres</span>{" "}
              {props.car.tires}
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">FuelType</span>
              {props.car.fuelType}
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary">Price</span>{" "}
              {props.car.price}
            </li>
          </ul>
          <div className="card-body">
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                props.updateList(props.car);
              }}
            >
              EDIT CAR
            </button>
            <button
              className="btn btn-danger"
              onClick={deleteHandler.bind(null, props.car._id)}
            >
              DELETE CAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarListItems;
