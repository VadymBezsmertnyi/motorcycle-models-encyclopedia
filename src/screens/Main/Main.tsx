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

// constants
import { PATHS_MAIN_SCREENS } from "../../navigation/Navigators.constants";

// styles
import { styles } from "./Main.styles";
import { getImageTypeMoto } from "../../helps/images";

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

  console.log(
    motorcyclesDB.reduce(
      (state, next) =>
        state.includes(next.Category) ? state : [...state, next.Category],
      [] as string[]
    )
  );

  const renderItem: ListRenderItem<MotorcycleType> = ({ item }) => {
    return (
      <TouchableOpacity
        key={`moto-${item.id}`}
        style={styles.containerItem}
        onPress={() => {
          navigation.navigate(PATHS_MAIN_SCREENS.item, { motoId: item.id });
        }}
      >
        <Image
          source={getImageTypeMoto(item.Category)}
          style={{ position: "absolute", width: "100%", height: 200 }}
        />
        <Shadow stretch>
          <View style={styles.containerInfoItem}>
            <View style={styles.partItem}>
              <Text style={styles.titleItem}>
                Brand: <Text style={styles.subTitle}>{item.Brand}</Text>
              </Text>
              <Text style={styles.titleItem}>
                Model: <Text style={styles.subTitle}>{item.Model}</Text>
              </Text>
            </View>
            <View style={styles.partItem}>
              <Text style={styles.titleItem}>
                Year: <Text style={styles.subTitle}>{item.Year}</Text>
              </Text>
              <Text style={styles.titleItem}>
                style: <Text style={styles.subTitle}>{item.Category}</Text>
              </Text>
            </View>
            <AntDesign name="caretright" size={24} color="black" />
          </View>
        </Shadow>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={{ fontSize: 12, color: "gray" }}>
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
        onEndReached={(info) => {
          console.log("info", info);
          setAmountShow((state) => state + 20);
        }}
        contentContainerStyle={{
          padding: 15,
          paddingTop: 20,
          gap: 6,
        }}
      />
    </View>
  );
};
