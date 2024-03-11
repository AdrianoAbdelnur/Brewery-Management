import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./slices/auth/authSlice";
import { customersSlice } from "./slices/customers/customersSlice";


export const store = configureStore({
    reducer: {     
        auth: authSlice.reducer,
        customers: customersSlice.reducer
    }
})