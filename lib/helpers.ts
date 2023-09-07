import {client} from "./supabaseClient";
import {setUsers, startGame,} from "../state/slices";
import {AnyAction, Dispatch} from "redux";
import {router} from "expo-router";

export function createRandomPin() {
    const min = 0;       // Minimum 6-digit number
    const max = 999999;  // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)).toString().padStart(6, '0');
}

export function createChannel(pin: string, name: string, dispatch: Dispatch<AnyAction>) {
    const channel = client.channel(pin)

    channel
        .on("presence",
            {event: "sync"},
            () => {
                const state = channel.presenceState()
                const uuids = Object.keys(state)
                const users = uuids.map((uuid) => {
                    const presences = state[uuid] as unknown as { user: string, images: string }[]
                    return {
                        name: presences[0].user,
                        uuid: uuid,
                        images: presences[0].images
                    }
                })
                dispatch(setUsers(users))
            })
        .on("broadcast", {event: "start_game"}, (message) => {
            console.log("start_game", message)
            router.push("/GameScreen")
            dispatch(startGame())
        })
        .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                const presenceTrackStatus = await channel.track({
                    user: name,
                    images: []
                })
            }
        })


    return channel
}
