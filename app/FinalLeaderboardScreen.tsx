import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import LeaderboardList from "../components/LeaderboardList";

export default function LeaderboardScreen() {
  const continueGame = () => {
    router.push("/GameScreen");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="displayMedium">Final Results</Text>
      <LeaderboardList />
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="contained"
          onPress={continueGame}
          style={{ marginBottom: 20, marginHorizontal: 16 }}
        >
          Leave Game
        </Button>
        <Button
          mode="contained"
          onPress={continueGame}
          style={{ marginBottom: 20, marginHorizontal: 16 }}
        >
          Play Again
        </Button>
      </View>
    </View>
  );
}
