import { Button } from "react-native-paper";
import { SafeAreaView, View, FlatList, Image } from "react-native";
import { router } from "expo-router";

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
      <View style={{ flex: 2 }}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          resizeMode="contain"
          style={{ flex: 1, height: null, width: "100%", marginBottom: 10 }}
        />
      </View>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={players}
          numColumns={2}
          renderItem={({ item }) => (
            <Button
              mode="elevated"
              onPress={() => {
                router.push("/FinalLeaderboardScreen");
              }}
              style={{ width: "46%", margin: "2%" }}
            >
              {item.name}
            </Button>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
