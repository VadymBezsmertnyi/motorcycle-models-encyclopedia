import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { FlatList, Image, ListRenderItem, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { favoritesContext } from "../../providers/FavoritesProvider/FavoritesProvider";

// components
import { RenderItem } from "../../components/RenderItem/RenderItem";
import { Header } from "../../components/Header/Header";

// images
import backgroundImage from "../../../assets/images/backgroundFavorites.jpeg";

// styles
import { styles } from "./Favorites.styles";

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
      <Image source={backgroundImage} style={styles.imageBackground} />
      <Header
        navigation={navigation}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        amountShowMotorcycles={amountShowMotorcycles}
        amountAllMotorcycles={amountAllMotorcycles}
        isBack
        title={i18n._("Favorites")}
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
