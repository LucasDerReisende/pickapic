import {View} from "react-native";
import {Appbar, Button, TextInput} from 'react-native-paper';
import {router} from "expo-router";
import {useState} from "react";
import {client} from "../lib/supabaseClient";
import {RealtimeChannel} from "@supabase/supabase-js";

export default function PinEntryScreen() {
    const [pinString, setPinString] = useState<string>("")
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);

    const confirmPin = () => {
        const channel = client.channel(pinString)
        setChannel(channel)
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
                Confirm
            </Button>
        </View>
    )
}