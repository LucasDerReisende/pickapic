import {configureStore} from "@reduxjs/toolkit";
import stateReducer from "./slices";

const store = configureStore({
    reducer: {
        state: stateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store