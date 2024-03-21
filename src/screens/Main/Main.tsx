import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { motorcyclesContext } from "../../providers/MotorcyclesProvider/MotorcyclesProvider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { Input } from "../../components/Input/Input";
import { RenderItem } from "../../components/RenderItem/RenderItem";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigation/Navigators.constants";

// images
import backgroundImage from "../../../assets/images/background.jpeg";

// styles
import { styles } from "./Main.styles";

type MainProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Main: FunctionComponent<MainProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [amountShow, setAmountShow] = useState(20);

  const showMotorcycles = useMemo(
    () =>
      motorcyclesDB
        .filter((moto) =>
          valueSearch.length
            ? moto.Brand.toLocaleLowerCase().includes(
                valueSearch.toLocaleLowerCase()
              ) ||
              moto.Model.toString()
                .toLocaleLowerCase()
                .includes(valueSearch.toLocaleLowerCase())
            : moto
        )
        .splice(0, amountShow),
    [motorcyclesDB, valueSearch, amountShow]
  );
  const amountShowMotorcycles = useMemo(
    () => showMotorcycles.length,
    [showMotorcycles]
  );
  const amountAllMotorcycles = useMemo(
    () => motorcyclesDB.length,
    [motorcyclesDB]
  );

  const renderItem: ListRenderItem<MotorcycleType> = ({ item }) => {
    return (
      <RenderItem key={`moto-${item.id}`} navigation={navigation} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.imageBackground} />
      <Shadow stretch>
        <View style={styles.containerHeader}>
          <View style={styles.buttonsHeader}>
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
          </View>
          {isShowSearch && (
            <Input
              value={valueSearch}
              placeholder={i18n._("Searching for a motorcycle brand or model")}
              onChange={setValueSearch}
            />
          )}
          <Text style={styles.infoHeader}>
            {i18n._(
              "Displayed {amountShowMotorcycles} motorcycles out of {amountAllMotorcycles}",
              { amountShowMotorcycles, amountAllMotorcycles }
            )}
          </Text>
        </View>
      </Shadow>
      <FlatList
        data={showMotorcycles}
        renderItem={renderItem}
        onEndReached={() => {
          setAmountShow((state) => state + 20);
        }}
        contentContainerStyle={styles.containerList}
      />
    </View>
  );
};
