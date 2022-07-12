import React from "react";
import { useNavigate  } from "react-router-dom";

const Error = () => {
  const navigate  = useNavigate ();
  return (
    <>
      <div className="mainERRORTEXT">
        <h1>404 ERROR PAGE!</h1>
        <h3>Sorry,This page does not exit</h3>
        <button
          className="gobackerrorbtn"
          onClick={() => {
            navigate("/");
          }}
        >
          GO BACK
        </button>
      </div>
    </>
  );
};
export default Error;
