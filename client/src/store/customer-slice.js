import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    cars: [],
    spinner: false,
    getCustomer: {},
    getCar: {},
    session: {},
  },
  reducers: {
    setSpinner(state, action) {
      state.spinner = action.payload;
    },
    getCustomer(state, action) {
      state.getCustomer = action.payload;
    },
    getCar(state, action) {
      state.getCar = action.payload;
    },
    getAllCarList(state, action) {
      state.cars = action.payload.data.cars;
    },
    getSession(state, action) {
      console.log(action, "action");
      state.session = action.payload;
    },
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice;
