import {List} from "react-native-paper";

export default function LobbyNameListItem({lobbyName, finishedUpload}: { lobbyName: string, finishedUpload: boolean }) {
    return (
        <List.Item
            title={lobbyName}
            left={props => {
                if (finishedUpload) {
                    return <List.Icon {...props} icon="check"/>
                } else {
                    return <List.Icon {...props} icon="sync"/>
                }
            }}
        />
    )
}