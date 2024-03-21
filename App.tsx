import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

// providers
import LocalesProvider from "./localization/localization.provider";
import { MotorcyclesProvider } from "./src/providers/MotorcyclesProvider/MotorcyclesProvider";
import { FavoritesProvider } from "./src/providers/FavoritesProvider/FavoritesProvider";

// navigator
import { Navigators } from "./src/navigation/Navigators";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (appIsReady)
      (() => {
        const timeout = setTimeout(hideSplashScreen, 1000);
        return () => {
          clearTimeout(timeout);
        };
      })();
  }, [appIsReady]);

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <StatusBar />
        <NavigationContainer>
          <LocalesProvider>
            <MotorcyclesProvider>
              <FavoritesProvider>
                <Navigators />
              </FavoritesProvider>
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
