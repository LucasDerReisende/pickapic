import {createSlice} from "@reduxjs/toolkit";
import {User} from "../lib/user";

export interface StateInterface {
    name: string,
    pin: string,
    users: User[]
}

export const stateSlice =  createSlice({
    name: 'state',
    initialState: {
        name: "",
        pin: "",
        users: []
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setPin: (state, action) => {
            state.pin = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        }
    }
})

export const {setName, setPin, setUsers} = stateSlice.actions
export default stateSlice.reducer
