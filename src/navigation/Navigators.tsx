import React, { FunctionComponent, useMemo } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "./Navigators.types";

// screens
import { Main } from "../screens/Main/Main";

// constants
import { PATHS_MAIN_SCREENS } from "./Navigators.constants";
import { Item } from "../screens/Item/Item";
import { Favorites } from "../screens/Favorites/Favorites";
import { Settings } from "../screens/Settings/Settings";

const Stack = createNativeStackNavigator<RootMainScreensParamList>();

export const Navigators: FunctionComponent = () => {
  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      headerShown: false,
      contentStyle: {
        backgroundColor: "white",
      },
    }),
    []
  );
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={PATHS_MAIN_SCREENS.main}
    >
      <Stack.Screen
        key={`screen_main`}
        name={PATHS_MAIN_SCREENS.main}
        component={Main}
      />
      <Stack.Screen
        key={`screen_main`}
        name={PATHS_MAIN_SCREENS.item}
        component={Item}
      />
      <Stack.Screen
        key={`screen_main`}
        name={PATHS_MAIN_SCREENS.favorites}
        component={Favorites}
      />
      <Stack.Screen
        key={`screen_main`}
        name={PATHS_MAIN_SCREENS.settings}
        component={Settings}
      />
    </Stack.Navigator>
  );
};
