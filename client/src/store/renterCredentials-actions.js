import { renterCredentialsActions } from "./renterCredentials-slice";
import { toast } from "react-toastify";
import { uiActions } from "./ui-slice";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const getRenterUser = () => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/renters/getRenterUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const renterUserData = await fetchData();
      dispatch(renterCredentialsActions.getRenterUser(renterUserData));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: `${error}`,
      //   })
      // );
    }
  };
};

export const sendSignupFormData = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });

    const sendRequest = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/renters/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("signup", true);
      }
      if (data.status === "fail") {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success("SignUp successfully!", { position: "top-center" });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const sendSigninFormData = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });

    const sendRequest = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/renters/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("signin", true);
      }
      if (data.status === "fail") {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success("SignIn successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const sendUpdatePasswordFormData = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "Sending...",
    //     message: "Sending renter data!",
    //   })
    // );

    const sendRequest = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/renters/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("updatePassword", true);
      }
      if (data.status === "fail") {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success("PASSWORD UPDATED / SignIn successfully!", {
        position: "top-center",
      });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "success",
      //     title: "Success!",
      //     message: "SignIn successfully!",
      //   })
      // );
      // dispatch(uiActions.toggleShowNotification());
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: `${error}`,
      //   })
      // );
    }
  };
};
export const updateRenterInfo = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "Sending...",
    //     message: "Sending renter data!",
    //   })
    // );

    const sendRequest = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/renters/updateRenterInfo",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
      }
      if (data.status === "fail") {
        throw new Error(data.message);
      }
    };

    try {
      await sendRequest();
      toast.success("USER UPDATED / SignIn successfully!", {
        position: "top-center",
      });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "success",
      //     title: "Success!",
      //     message: "SignIn successfully!",
      //   })
      // );
      // dispatch(uiActions.toggleShowNotification());
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: `${error}`,
      //   })
      // );
    }
  };
};
export const addCar = (formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(uiActions.setSpinner(true));

    const sendRequest = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/v1/renters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const addCar = await sendRequest();

      dispatch(renterCredentialsActions.addCar(addCar.data));
      dispatch(uiActions.setSpinner(false));
      toast.success("Car Add successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};

export const getAllCarList = () => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(uiActions.setSpinner(true));
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/renters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const getAllCarList = await fetchData();
      dispatch(renterCredentialsActions.getAllCarList(getAllCarList));
      dispatch(uiActions.setSpinner(false));
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: `${error}`,
      //   })
      // );
    }
  };
};

export const deleteCar = (id) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(uiActions.setSpinner(true));

    const sendRequest = async () => {
      await fetch(`http://127.0.0.1:5000/api/v1/renters/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    };

    try {
      await sendRequest();

      dispatch(renterCredentialsActions.deleteCar(id));
      dispatch(uiActions.setSpinner(false));
      toast.error("Car Deleted successfully!", { position: "top-center" });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};
export const updateCar = (id, formData) => {
  return async (dispatch) => {
    toast.info("Sending API Request", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(uiActions.setSpinner(true));

    const sendRequest = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/renters/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const responseData = await sendRequest();

      dispatch(renterCredentialsActions.updateCar(responseData.data.data));
      dispatch(uiActions.setSpinner(false));
      toast.success("Car Updated successfully!", { position: "top-center" });
    } catch (error) {
      toast.error(`${error}`, { position: "top-center" });
    }
  };
};
