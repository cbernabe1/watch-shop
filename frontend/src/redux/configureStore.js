import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./watches.js";
import userReducer from "./users.js";
import cartReducer from "./carts.js";

const store = configureStore({
    reducer: {
        watches: watchReducer,
        users: userReducer,
        carts: cartReducer,
    }
});

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
})

export default store;