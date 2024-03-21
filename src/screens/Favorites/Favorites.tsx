import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// styles
import { styles } from "./Favorites.styles";

type FavoritesProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Favorites: FunctionComponent<FavoritesProps> = ({
  navigation,
}) => {
  return <View style={styles.container}></View>;
};
