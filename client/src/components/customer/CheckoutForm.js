import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    await stripe.redirectToCheckout({
      sessionId: props.session.id,
    });
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    // console.log(error, paymentMethod);
  };

  return (
    <>
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit}>
        {/* <CardElement />*/}
        <button
          type="submit"
          className="btn btn-dark"
          disabled={!stripe || !elements}
        >
          Book Car Now
        </button>
      </form>
    </>
  );
};
export default CheckoutForm;
