import {createSlice} from "@reduxjs/toolkit";

export interface StateInterface {
    name: string,
}


export const stateSlice =  createSlice({
    name: 'state',
    initialState: {
        name: "",
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
    }
})

export const {setName} = stateSlice.actions
export default stateSlice.reducer
