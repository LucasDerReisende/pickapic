import {client} from "./supabaseClient";
import {setUsers} from "../state/slices";
import {AnyAction, Dispatch} from "redux";

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
                    const presences = state[uuid] as unknown as { user: string }[]
                    return {
                        name: presences[0].user,
                        uuid: uuid,
                        uploadedImages: false
                    }
                })
                dispatch(setUsers(users))
            })
        .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                const presenceTrackStatus = await channel.track({
                    user: name
                })
            }
        })
    return channel
}
