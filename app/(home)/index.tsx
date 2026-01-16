import { Button, Text, View } from "react-native";
import { logout } from "../../services/auth";

export default function Home() {
  return (
    <View>
      <Text>🏀 Campus League Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
