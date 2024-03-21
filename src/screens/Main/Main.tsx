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
import { Header } from "../../components/Header/Header";

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
      <Header
        navigation={navigation}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        amountShowMotorcycles={amountShowMotorcycles}
        amountAllMotorcycles={amountAllMotorcycles}
      />
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
