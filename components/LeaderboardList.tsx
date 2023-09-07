import { Text } from "react-native-paper";
import { SafeAreaView, View, FlatList } from "react-native";

const players = [
  { name: "Lucas", score: 5 },
  { name: "Conrad", score: 2 },
  { name: "Luise", score: 7 },
  { name: "Smilla", score: 10 },
  { name: "Rebekka", score: 2 },
];

export default function LeaderboardList() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={players.sort((a, b) => b.score - a.score)}
        style={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text variant="headlineSmall" style={{ flex: 1 }}>
              {item.name}
            </Text>
            <Text variant="headlineSmall" style={{ flex: 1 }}>
              {item.score}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
