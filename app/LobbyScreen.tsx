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
    const name = useSelector((state: RootState) => state.state.name)
    const users = useSelector((state: RootState) => state.state.users)
    const gameStarted = useSelector((state: RootState) => state.state.gameStarted)
    const {supabaseChannel} = useSupabase();


    const uploadPhotos = () => {
        router.push("/PhotoUploadScreen")
    }

    const startGame = () => {
        if (supabaseChannel == null)
            return
        supabaseChannel.send({
            type: "broadcast",
            event: "start_game",
            payload: {

            }
        }).then(() => {
            console.log("Sent start game")
        })

        router.push("/GameScreen")
    }

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
                    users.map((user: User, index) => {
                        return <LobbyNameListItem key={index} user={user.name}
                                                  uploadedImages={user.images.length > 0}/>
                    })
                }
                <Button mode="outlined" onPress={uploadPhotos} style={{marginBottom: 20, marginHorizontal: 16}}>
                    Upload Photos
                </Button>
                <Button mode="contained" onPress={startGame}
                        disabled={!users.every((value: User, index, array) => value.images)}
                        style={{marginBottom: 20, marginHorizontal: 16}}>
                    Start Game
                </Button>
            </View>
        </View>
    )
}