import React, { useEffect } from "react";
import { getCustomer, getSession, getCar } from "../../store/customer-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import CustomerDetails from "./CustomerDetails";
import CarDetail from "./CarDetail";

const CheckoutPage = () => {
  const { id } = useParams();
  console.log(id);
  const stripePromise = loadStripe(
    "pk_test_51LKLKZKcOzn6E3M0BGXXfhdLFpPSbOIzEjBjDPALOSArAZYPZXyfKXCmyKLQeylWb71W8UZZkiXmhVO7532wAPw500N1qTSdT7"
  );
  const dispatch = useDispatch();
  const history = useNavigate();

  const session = useSelector((state) => state.customer.session);

  useEffect(() => {
    if (!localStorage.getItem("customerToken")) {
      return history("/");
    }
    dispatch(getCustomer());
    dispatch(getCar(id));
    dispatch(getSession(id));
  }, [dispatch, history, id]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto ">
            <CarDetail />
            <br></br>
            <Elements stripe={stripePromise}>
              <CheckoutForm session={session} />
            </Elements>
          </div>
          <div className="col-md-6 mx-auto">
            <CustomerDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
