import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCar } from "../../store/renterCredentials-actions";
import CarListItem from "./CarListItems";
import { toast } from "react-toastify";
import Spinner from "../../UI/Spinner";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const CarList = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const refClose = useRef(null);
  const spinner = useSelector((state) => state.ui.spinner);
  const [carData, setCarData] = useState({
    id: "",
    seats: "",
    tires: "",
    fuelType: "",
    price: "",
    photo: "",
  });
  const OnChangeHandler = (e) => {
    e.preventDefault();
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    let { files } = e.target;
    function encodeImageFileAsURL(file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setCarData({ ...carData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
    encodeImageFileAsURL(files[0]);
  };

  const onclickHandler = async (e) => {
    e.preventDefault();
    const { seats, tires, fuelType, price, photo } = carData;
    if (
      seats === "" ||
      tires === "" ||
      fuelType === "" ||
      price === "" ||
      photo === ""
    ) {
      return toast.error(`Fill all the fields`, { position: "top-center" });
    }
    dispatch(updateCar(carData.id, carData));
    refClose.current.click();
  };

  const updateList = (currentList) => {
    ref.current.click();
    setCarData({
      id: currentList._id,
      seats: currentList.seats,
      tires: currentList.tires,
      fuelType: currentList.fuelType,
      price: currentList.price,
      photo: currentList.photo,
    });
  };

  const CarList = useSelector((state) => state.renterCredentials.cars);
  console.log("allcarLISTS", CarList);
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        launch
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Car Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="seats">Seats</label>
                  <input
                    required
                    value={carData.seats}
                    onChange={OnChangeHandler}
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
                    value={carData.tires}
                    onChange={OnChangeHandler}
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
                    value={carData.fuelType}
                    onChange={OnChangeHandler}
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
                    value={carData.price}
                    onChange={OnChangeHandler}
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={onclickHandler}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {spinner ? (
        <Spinner></Spinner>
      ) : CarList.length === 0 ? (
        "plz Add a Car"
      ) : (
        CarList.map((car) => {
          return (
            <CarListItem key={car._id} car={car} updateList={updateList} />
          );
        })
      )}
    </>
  );
};

export default CarList;
