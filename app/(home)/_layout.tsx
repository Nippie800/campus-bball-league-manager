import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header if you want a clean screen
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
