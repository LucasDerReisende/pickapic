import {router} from "expo-router";
import {Appbar, Button, PaperProvider, TextInput, Text} from "react-native-paper";
import {client} from "../lib/supabaseClient";
import {createChannel, createRandomPin} from "../lib/helpers";
import {setName, setPin} from "../state/slices";
import {useDispatch, useSelector} from "react-redux";
import {useSupabase} from "../components/SupabaseContext";
import {RootState} from "../state/store";
import {View} from "react-native";
import {User} from "../lib/user";


export default function HomeScreen() {

    const dispatch = useDispatch()

    const name = useSelector((state: RootState) => state.state.name)
    const users = useSelector((state: RootState) => state.state.users)

    const {supabaseChannel, setSupabaseChannel} = useSupabase();


    const startGame = () => {
        if (name == "") {
            return
        }
        const randomPin = createRandomPin()
        dispatch(setPin(randomPin))
        const channel = createChannel(randomPin, name, dispatch)
        setSupabaseChannel(channel)
        router.push("/LobbyScreen")
    }

    const joinGame = () => {
        router.push("/PinEntryScreen")
    }

    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content title={"Home"}/>
            </Appbar.Header>
            <TextInput
                label="Name"
                value={name}
                mode={"outlined"}
                onChangeText={text => dispatch(setName(text))}
                style={{marginBottom: 20, marginHorizontal: 16}}
            />
            <Button mode="contained" onPress={startGame} style={{marginBottom: 20, marginHorizontal: 16}}>
                Start Game
            </Button>
            <Button mode="outlined" onPress={joinGame} style={{marginBottom: 20, marginHorizontal: 16}}>
                Join Game
            </Button>
        </PaperProvider>
    )
}