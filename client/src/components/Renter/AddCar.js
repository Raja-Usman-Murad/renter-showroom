import React, { useState } from "react";
import { addCar } from "../../store/renterCredentials-actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddCar = () => {
  const dispatch = useDispatch();
  const [car, setCar] = useState({
    seats: "",
    tires: "",
    fuelType: "",
    price: "",
  });

  const handlePhoto = (e) => {
    let { files } = e.target;
    function encodeImageFileAsURL(file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setCar({ ...car, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
    encodeImageFileAsURL(files[0]);
  };

  const handleInputs = (e) => {
    e.preventDefault();
    setCar({ ...car, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { seats, tyres, fuelType, price, photo } = car;
    if (
      seats === "" ||
      tyres === "" ||
      fuelType === "" ||
      price === "" ||
      photo === ""
    ) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    dispatch(addCar(car));
    //clear All Fields
    setCar({
      seats: "",
      tires: "",
      fuelType: "",
      price: "",
      photo: null,
    });
    // window.location.reload(false);
  };
  return (
    <>
      <h1 className="text-center">ADD CAR</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input
            required
            value={car.seats}
            onChange={handleInputs}
            type="text"
            className="form-control"
            name="seats"
            id="seats"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tires">Tyres</label>
          <input
            required
            value={car.tires}
            onChange={handleInputs}
            name="tires"
            type="text"
            className="form-control"
            id="tires"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <input
            required
            value={car.fuelType}
            onChange={handleInputs}
            name="fuelType"
            type="text"
            className="form-control"
            id="fuelType"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            required
            value={car.price}
            onChange={handleInputs}
            name="price"
            type="text"
            className="form-control"
            id="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Car Photo</label>
          <input
            accept="image/*"
            required
            onChange={handlePhoto}
            name="photo"
            type="file"
            className="form-control"
            id="photo"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ADD CAR
        </button>
      </form>
    </>
  );
};

export default AddCar;
