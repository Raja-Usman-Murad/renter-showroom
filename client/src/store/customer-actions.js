import { customerActions } from "./customer-slice";
import { uiActions } from "./ui-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const getAllCarList = (query) => {
  console.log(query);
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(uiActions.setSpinner(true));
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/customers?fuelType=${
          query?.fuelType
        }&price[${query?.price.split(",")[0]}]=${
          query?.price.split(",")[1]
        }&tires=${query?.tires}&seats[${query?.seats.split(",")[0]}]=${
          query?.seats.split(",")[1]
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const getAllCarList = await fetchData();
      dispatch(customerActions.getAllCarList(getAllCarList));
      dispatch(uiActions.setSpinner(false));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const createCustomer = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    const sendRequest = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/v1/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("customerData", data);
      if (data.status === "success") {
        localStorage.setItem("customerToken", data.authToken);
      }
      if (data.status === "fail") {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success("Customer Added successfully!", { position: "top-center" });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const getCustomer = () => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/customers/getCustomer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const getCustomer = await fetchData();
      dispatch(customerActions.getCustomer(getCustomer.data.user));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const getSession = (carId) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/bookings/checkout-session/${carId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const session = await fetchData();
      dispatch(customerActions.getSession(session.session));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};
export const getCar = (carId) => {
  console.log(carId, "carId");
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/renters/${carId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }
      );

      const data = await response.json();
      console.log(data, "carData");
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const car = await fetchData();
      dispatch(customerActions.getCar(car.data.car));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};
