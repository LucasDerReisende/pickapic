import {router} from "expo-router";
import {Appbar, Button, PaperProvider, TextInput} from "react-native-paper";
import {useState} from "react";

export default function HomeScreen() {

    const [playerName, setPlayerName] = useState<string>("");

    const startGame = () => {
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
                value={playerName}
                mode={"outlined"}
                onChangeText={text => setPlayerName(text)}
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