import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Shadow } from "react-native-shadow-2";
import { AntDesign, Fontisto } from "@expo/vector-icons";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { Input } from "../Input/Input";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigation/Navigators.constants";

// styles
import { styles } from "./Header.styles";

type HeaderProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
  isShowSearch: boolean;
  setIsShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  amountShowMotorcycles?: number;
  amountAllMotorcycles?: number;
  valueSearch: string;
  setValueSearch?: React.Dispatch<React.SetStateAction<string>>;
  isBack?: boolean;
  title?: string;
  isHideSearch?: boolean;
};

export const Header: FunctionComponent<HeaderProps> = ({
  navigation,
  isShowSearch,
  setIsShowSearch,
  amountShowMotorcycles = null,
  amountAllMotorcycles = null,
  valueSearch,
  setValueSearch,
  isBack = false,
  title,
  isHideSearch = false,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <Shadow stretch>
      <View style={styles.containerHeader}>
        <View style={styles.buttonsHeader}>
          {isBack ? (
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={30} color={"#0d1138"} />
            </TouchableOpacity>
          ) : (
            <View style={styles.partHeader}>
              <TouchableOpacity
                style={styles.buttonHeader}
                onPress={() => {
                  navigation.navigate(PATHS_MAIN_SCREENS.favorites);
                }}
              >
                <Fontisto name="favorite" size={30} color="#0d1138" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonHeader}
                onPress={() => {
                  navigation.navigate(PATHS_MAIN_SCREENS.settings);
                }}
              >
                <AntDesign name="setting" size={30} color="#0d1138" />
              </TouchableOpacity>
            </View>
          )}
          {title && <Text style={styles.titleHeader}>{title}</Text>}
          {!isHideSearch ? (
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => {
                setIsShowSearch((state) => !state);
              }}
            >
              <AntDesign
                name="search1"
                size={30}
                color={isShowSearch ? "orange" : "black"}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.containerEmpty} />
          )}
        </View>
        {isShowSearch && setValueSearch ? (
          <Input
            value={valueSearch}
            placeholder={i18n._("Searching for a motorcycle brand or model")}
            onChange={setValueSearch}
          />
        ) : null}
        {amountShowMotorcycles !== null && amountAllMotorcycles !== null ? (
          <Text style={styles.infoHeader}>
            {i18n._(
              "Displayed {amountShowMotorcycles} motorcycles out of {amountAllMotorcycles}",
              { amountShowMotorcycles, amountAllMotorcycles }
            )}
          </Text>
        ) : null}
      </View>
    </Shadow>
  );
};
