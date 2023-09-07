import {router} from "expo-router";
import {Appbar, Button, PaperProvider, TextInput} from "react-native-paper";
import {client} from "../lib/supabaseClient";
import {createRandomPin} from "../lib/helpers";
import {setName} from "../state/slices";
import {useDispatch, useSelector} from "react-redux";
import {useSupabase} from "../components/SupabaseContext";
import {RootState} from "../state/store";


export default function HomeScreen() {

    const dispatch = useDispatch()

    const name = useSelector((state: RootState) => state.state.name)

    const {supabaseChannel, setSupabaseChannel} = useSupabase();


    const startGame = () => {
        if (name == "") {
            return
        }
        const randomPin = createRandomPin()
        console.log("random pin", randomPin)
        console.log('name', name)
        const channel = client.channel(randomPin, {config: {presence: {key: name}}})


        channel
            .on("presence",
                {event: "sync"},
                () => {
                    console.log("presence sync")
                    const state = channel.presenceState()
                    console.log('non', state)
                })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    const presenceTrackStatus = await channel.track({
                        user: name
                    })
                    console.log('presenceTrackStatus', presenceTrackStatus)
                    console.log('name', name)

                }
            })

        setSupabaseChannel(channel)
        router.push("/LobbyScreen")
    }

    const joinGame = () => {
        if (supabaseChannel == null) {
            return
        }
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