import {List} from "react-native-paper";

export default function LobbyNameListItem({user, uploadedImages}: { user: string, uploadedImages: boolean }) {
    return (
        <List.Item
            title={user}
            left={props => {
                if (uploadedImages) {
                    return <List.Icon {...props} icon="check"/>
                } else {
                    return <List.Icon {...props} icon="sync"/>
                }
            }}
        />
    )
}