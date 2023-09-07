import { Button } from "react-native-paper";
import { SafeAreaView, View, FlatList, Text, Image } from "react-native";

//Array.from({length: 5}, () => <Button/>)

const players = [
  { name: "Lucas" },
  { name: "Conrad" },
  { name: "Luise" },
  { name: "Smilla" },
  { name: "Rebekka" },
];

export default function GameScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          resizeMode="cover"
          style={{ flex: 1, height: 100, width: null }}
        />
      </View>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={players}
          numColumns={2}
          renderItem={({ item }) => (
            <Button mode="elevated" onPress={() => {}} style={{ width: "50%" }}>
              {item.name}
            </Button>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
