import {configureStore} from "@reduxjs/toolkit";
import {JWT_PERSISTENT_STATE, userReducer} from "./user.slice.ts";
import {saveState} from "./storege.ts";
import {CART_PERSISTENT_STATE, cartReducer} from "./cart.slice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart:cartReducer
    }
})

store.subscribe(()=>{
    saveState({jwt:store.getState()?.user.jwt},JWT_PERSISTENT_STATE)
    saveState(store.getState().cart,CART_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;