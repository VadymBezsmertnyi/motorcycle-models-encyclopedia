import React, { FunctionComponent, useContext, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { Header } from "../../components/Header/Header";

// constants
import { languages } from "../../../localization/localization.const";

// images
import backgroundImage from "../../../assets/images/background_settings.jpeg";

// styles
import { styles } from "./Settings.styles";

type SettingsProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Settings: FunctionComponent<SettingsProps> = ({ navigation }) => {
  const { i18n, language, setLanguage } = useContext(localesContext);
  const selectLanguage = useMemo(
    () =>
      languages.find((languageState) => languageState.key === language) ||
      languages[0],
    [language]
  );
  const changeLanguage = useMemo(
    () =>
      languages.find(
        (languageState) =>
          languageState.key === (language === "en" ? "uk" : "en")
      ) || languages[0],
    [language]
  );

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.imageBackground} />
      <Header
        navigation={navigation}
        isShowSearch={false}
        valueSearch={""}
        isBack
        isHideSearch
        title={i18n._("Settings")}
      />
      <View style={styles.containerMain}>
        <View style={styles.line}>
          <Text style={styles.titleLine}>{i18n._("Language")}:</Text>
          <Text style={styles.subTitleLine}>{selectLanguage.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLanguage(changeLanguage.key);
          }}
        >
          <Text style={styles.titleButton}>
            {i18n._("Change to {changeLanguage}", {
              changeLanguage: changeLanguage.title,
            })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
