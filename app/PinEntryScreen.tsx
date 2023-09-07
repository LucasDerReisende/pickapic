import {View} from "react-native";
import {Appbar, Button, TextInput} from 'react-native-paper';
import {router} from "expo-router";
import {useState} from "react";
import {client} from "../lib/supabaseClient";
import {useDispatch, useSelector} from "react-redux";
import {useSupabase} from "../components/SupabaseContext";
import {RootState} from "../state/store";
import {createChannel} from "../lib/helpers";
import {setPin} from "../state/slices";

export default function PinEntryScreen() {

    const pin = useSelector((state: RootState) => state.state.pin)


    const dispatch = useDispatch()
    const { supabaseChannel, setSupabaseChannel } = useSupabase();


    const name = useSelector((state: RootState) => state.state.name)

    const confirmPin = () => {
        const channel = createChannel(pin, name, dispatch)
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
                value={pin}
                mode={"outlined"}
                keyboardType={"number-pad"}
                onChangeText={text => dispatch(setPin(text))}
                style={{marginBottom: 20, marginHorizontal: 16}}
            />
            <Button mode="contained" onPress={confirmPin} style={{marginBottom: 20, marginHorizontal: 16}}>
                Confirm {name}
            </Button>
        </View>
    )
}