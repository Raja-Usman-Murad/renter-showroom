import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import renterCredentialsSlice from "../store/renterCredentials-slice";
import customerSlice from "../store/customer-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    renterCredentials: renterCredentialsSlice.reducer,
    customer: customerSlice.reducer,
  },
});

export default store;
