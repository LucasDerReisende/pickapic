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
      <Text variant="displayMedium">Leaderboard</Text>
      <LeaderboardList />
      <Button
        mode="contained"
        onPress={continueGame}
        style={{ marginBottom: 20, marginHorizontal: 16 }}
      >
        Continue
      </Button>
    </View>
  );
}
