import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// navigator
import { Navigators } from "./src/navigation/Navigators";
import LocalesProvider from "./localization/localization.provider";
import { MotorcyclesProvider } from "./src/providers/MotorcyclesProvider/MotorcyclesProvider";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <StatusBar />
        <NavigationContainer>
          <LocalesProvider>
            <MotorcyclesProvider>
              <Navigators />
            </MotorcyclesProvider>
          </LocalesProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gestureHandlerRootView: { flex: 1 },
});
