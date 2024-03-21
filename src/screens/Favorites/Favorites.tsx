import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// styles
import { styles } from "./Favorites.styles";
import { Shadow } from "react-native-shadow-2";
import { localesContext } from "../../../localization/localization.provider";
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";
import { RenderItem } from "../../components/RenderItem/RenderItem";
import { Input } from "../../components/Input/Input";
import { favoritesContext } from "../../providers/FavoritesProvider/FavoritesProvider";

type FavoritesProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
};

export const Favorites: FunctionComponent<FavoritesProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { favorites } = useContext(favoritesContext);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [amountShow, setAmountShow] = useState(20);

  const showMotorcycles = useMemo(
    () =>
      favorites
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
    [favorites, valueSearch, amountShow]
  );
  const amountShowMotorcycles = useMemo(
    () => showMotorcycles.length,
    [showMotorcycles]
  );
  const amountAllMotorcycles = useMemo(() => favorites.length, [favorites]);

  const renderItem: ListRenderItem<MotorcycleType> = ({ item }) => {
    return (
      <RenderItem key={`moto-${item.id}`} navigation={navigation} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <Shadow stretch>
        <View style={styles.containerHeader}>
          <View style={styles.buttonsHeader}>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={30} color={"#0d1138"} />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>{i18n._("Favorites")}</Text>
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
        data={[]}
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
