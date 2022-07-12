import { createSlice } from "@reduxjs/toolkit";

const renterCredentialsSlice = createSlice({
  name: "renterCredentials",
  initialState: {
    cars: [],
    changed: false,
    renterUserData: {},
  },
  reducers: {
    getRenterUser(state, action) {
      state.renterUserData = action.payload.data.user;
    },
    addCar(state, action) {
      state.cars.unshift(action.payload);
    },
    deleteCar(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cars.findIndex((car) => car._id === id);
      state.cars.splice(existingItemIndex, 1);
    },
    getAllCarList(state, action) {
      state.cars = action.payload.data.cars;
    },
    updateCar(state, action) {
      const id = action.payload._id;
      const existingItemIndex = state.cars.findIndex((car) => car._id === id);
      state.cars.splice(existingItemIndex, 1, action.payload);
    },
  },
});

export const renterCredentialsActions = renterCredentialsSlice.actions;

export default renterCredentialsSlice;
