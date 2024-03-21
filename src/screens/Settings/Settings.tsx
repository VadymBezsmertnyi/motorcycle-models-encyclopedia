import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// styles
import { styles } from "./Settings.styles";

type SettingsProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Settings: FunctionComponent<SettingsProps> = ({ navigation }) => {
  return <View style={styles.container}></View>;
};
