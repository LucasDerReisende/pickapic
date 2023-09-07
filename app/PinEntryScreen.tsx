import {View} from "react-native";
import {Appbar, Button, TextInput} from 'react-native-paper';
import {router} from "expo-router";
import {useState} from "react";
import {client} from "../lib/supabaseClient";
import {useDispatch, useSelector} from "react-redux";
import {useSupabase} from "../components/SupabaseContext";
import {RootState} from "../state/store";

export default function PinEntryScreen() {
    const [pinString, setPinString] = useState<string>("")

    const dispatch = useDispatch()
    const { supabaseChannel, setSupabaseChannel } = useSupabase();


    const name = useSelector((state: RootState) => state.state.name)

    const confirmPin = () => {
        console.log("pinString", pinString)
        console.log('name', name)
        const channel = client.channel(pinString, {config: {presence: {key: name}}})

        channel
            .on("presence",
                {event: "sync"},
                () => {
                    console.log("presence sync")
                    const state = channel.presenceState()
                    console.log('pin', state)
                    console.log('sup', supabaseChannel)
                })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    const presenceTrackStatus = await channel.track({
                        user: name
                    })
                    console.log('presenceTrackStatus', presenceTrackStatus)
                }
            })

        setSupabaseChannel(channel)
        router.push("/LobbyScreen")
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={"Pin Entry"} />
            </Appbar.Header>
            <TextInput
                label="Pin"
                value={pinString}
                mode={"outlined"}
                keyboardType={"number-pad"}
                onChangeText={text => setPinString(text)}
                style={{marginBottom: 20, marginHorizontal: 16}}
            />
            <Button mode="contained" onPress={confirmPin} style={{marginBottom: 20, marginHorizontal: 16}}>
                Confirm {name}
            </Button>
        </View>
    )
}