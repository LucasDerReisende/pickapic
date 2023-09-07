import {Text, View} from "react-native"
import {Link} from "expo-router";
import {PaperProvider} from "react-native-paper";

export default function HomeScreen() {
    return (
        <PaperProvider>
            <View>
                <Text>Home</Text>
                <Link href={"/PinEntryScreen"}>Entry</Link>
            </View>
        </PaperProvider>
    )
}