import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../store/bookSlice/index.js"
import authReducer from "../store/authSlice/index.js"
import cartReducer from "../store/cartSlice/index.js";

const store = configureStore({
    reducer: {
        book: bookReducer,
        auth: authReducer,
        cart: cartReducer
    }
})
export default store;