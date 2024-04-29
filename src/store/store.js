import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./slices/auth/authSlice";
import { customersSlice } from "./slices/customers/customersSlice";
import { barrelSlice } from "./slices/barrels/barrelsSlice";
import { salesSlice } from "./slices/sales/salesSlice";
import { paySlice } from "./slices/pay/paySlice";
import { stylesSlice } from "./slices/beerStyles/stylesSlice";
import { recipeSlice } from "./slices/recipe/RecipeSlice";
import { productionsSlice } from "./slices/productions/productionsSlice";
import { costsSlice } from "./slices/costs/costsSlice";


export const store = configureStore({
    reducer: {     
        auth: authSlice.reducer,
        customers: customersSlice.reducer,
        barrels: barrelSlice.reducer,
        sales: salesSlice.reducer,
        pay: paySlice.reducer,
        styles : stylesSlice.reducer,
        recipes : recipeSlice.reducer,
        productions : productionsSlice.reducer,
        costs : costsSlice.reducer
    }
})