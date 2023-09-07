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
        users: [],
        gameStarted: false
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
        },
        startGame: (state) => {
            state.gameStarted = true
        },
        stopGame: (state) => {
            state.gameStarted = false
        }
    }
})

export const {setName, setPin, setUsers, startGame, stopGame} = stateSlice.actions
export default stateSlice.reducer
