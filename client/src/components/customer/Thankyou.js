import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("customerToken")) {
      return history("/");
    }
  }, [history]);
  return (
    <>
      <h1 className="text-center text-success d-flex justify-content-center align-items-center">
        Thankyou For Renting Car :)
      </h1>
    </>
  );
};

export default Thankyou;
