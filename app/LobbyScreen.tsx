import {View, Text} from "react-native";
import {Appbar, Button} from "react-native-paper";
import {router} from "expo-router";
import LobbyNameListItem from "../components/LobbyNameListItem";
import {useSelector} from "react-redux";
import {RootState} from "../state/store";
import {User} from "../lib/user";
import {useSupabase} from "../components/SupabaseContext";

class Player {
    name: string
    uploadFinished: boolean

    constructor(name: string, uploadFinished: boolean) {
        this.name = name
        this.uploadFinished = uploadFinished
    }
}

export default function LobbyScreen() {

    const pin = useSelector((state: RootState) => state.state.pin)
    const users = useSelector((state: RootState) => state.state.users)
    const { supabaseChannel, setSupabaseChannel } = useSupabase();


    const uploadPhotos = () => {
        router.push("/UploadScreen")
    }

    const startGame = () => {
        router.push("/GameScreen")
    }

    const players = [
        new Player("Player 1", true),
        new Player("Player 2", false)
    ]

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    if (supabaseChannel != null) {
                        supabaseChannel.untrack().then(() => {
                            console.log("Untracked channel")
                        })
                    }
                    router.back()
                }}
                />
                <Appbar.Content title={"Lobby"}/>
            </Appbar.Header>
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 36, marginBottom: 20}}>{pin}</Text>
                    <Text>Game Pin</Text>
                </View>
                {
                    players.map((player, index) => {
                        return <LobbyNameListItem key={index} lobbyName={player.name}
                                                  finishedUpload={player.uploadFinished}/>
                    })
                }
                <Button mode="outlined" onPress={uploadPhotos} style={{marginBottom: 20, marginHorizontal: 16}}>
                    Upload Photos
                </Button>
                <Button mode="contained" onPress={startGame} style={{marginBottom: 20, marginHorizontal: 16}}>
                    Start Game
                </Button>
            </View>
        </View>
    )
}