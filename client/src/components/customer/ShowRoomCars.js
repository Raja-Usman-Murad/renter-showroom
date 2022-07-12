import React, { useEffect } from "react";
import { getAllCarList } from "../../store/customer-actions";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ShowRoomCarsItem from "./ShowRoomCarsItem";
import Spinner from "../../UI/Spinner";
import Filter from "./Filter";
import NothingFound from "./NothingFound";

const ShowRoomCars = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const AllCarList = useSelector((state) => state.customer.cars);
  const spinner = useSelector((state) => state.ui.spinner);
  console.log("AllCarList", AllCarList);

  useEffect(() => {
    if (!localStorage.getItem("customerToken")) {
      return history("/");
    }
    dispatch(getAllCarList());
  }, [dispatch, history]);
  return (
    <>
      <h1 className="text-center m-2 text-dark">CARS SHOWROOM</h1>
      {spinner ? (
        <Spinner></Spinner>
      ) : AllCarList.length === 0 ? (
        <NothingFound />
      ) : (
        <>
          <Filter />
          <div class="container">
            <div className="row">
              {AllCarList.map((car) => {
                return <ShowRoomCarsItem key={car._id} car={car} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShowRoomCars;
