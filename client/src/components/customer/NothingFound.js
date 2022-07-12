import React from "react";
import { getAllCarList } from "../../store/customer-actions";

import { useDispatch } from "react-redux";

const NothingFound = () => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(getAllCarList());
  };
  return (
    <>
      <h3 className="text-center text-danger mt-4">No Match Found</h3>
      <button
        className="text-center btn btn-success d-flex mt-4"
        onClick={clickHandler}
      >
        ShowAll
      </button>
    </>
  );
};

export default NothingFound;
