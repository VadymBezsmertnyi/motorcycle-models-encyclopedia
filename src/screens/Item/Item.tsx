import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { motorcyclesContext } from "../../providers/MotorcyclesProvider/MotorcyclesProvider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { Header } from "../../components/Header/Header";

// styles
import { styles } from "./Item.styles";
import { favoritesContext } from "../../providers/FavoritesProvider/FavoritesProvider";
import { Line } from "./components/Line/Line";
import { getImageTypeMoto } from "../../helps/images";
import { ModalWebView } from "./components/ModalWebView/ModalWebView";

type ItemProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
  route: RouteProp<RootMainScreensParamList, "item">;
};

export const Item: FunctionComponent<ItemProps> = ({ navigation, route }) => {
  const { i18n } = useContext(localesContext);
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const { favoritesIds, setFavorite } = useContext(favoritesContext);
  const [isSearch, setIsSearch] = useState(false);
  const selectMotorcycle = useMemo(
    () => motorcyclesDB.find((moto) => moto.id === route.params.motoId) || null,
    [route.params.motoId, motorcyclesDB]
  );
  const isFavorite = useMemo(
    () => favoritesIds.includes(route.params.motoId),
    [favoritesIds, route.params.motoId]
  );

  if (!selectMotorcycle) {
    navigation.goBack();

    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          source={getImageTypeMoto(selectMotorcycle.Category)}
          style={styles.imageBackground}
        />
        <Header
          navigation={navigation}
          isShowSearch={false}
          valueSearch={""}
          isBack
          isHideSearch
          isFavorite={isFavorite}
          setIsFavorite={() => {
            setFavorite(route.params.motoId);
          }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.containerMain}
        >
          <View style={styles.mainInfo}>
            <Text style={styles.titleMainInfo}>
              {i18n._("Brand")}:{" "}
              <Text style={styles.subTitleMainInfo}>
                {selectMotorcycle.Brand}
              </Text>
            </Text>
            <Text style={styles.titleMainInfo}>
              {i18n._("Model")}:{" "}
              <Text style={styles.subTitleMainInfo}>
                {selectMotorcycle.Model}
              </Text>
            </Text>
          </View>
          <Line
            title={i18n._("Year")}
            value={selectMotorcycle.Year}
            subTitle={i18n._("year the motorcycle was built")}
          />
          <Line
            title={i18n._("Category")}
            value={selectMotorcycle.Category}
            subTitle={i18n._("sub-class of motorcycle in the market (style)")}
          />
          <Line
            title={i18n._("Rating")}
            value={selectMotorcycle.Rating}
            subTitle={i18n._("review average out of 5 stars")}
          />
          <Line
            title={i18n._("Displacement (ccm)")}
            value={selectMotorcycle.Displacement}
            subTitle={i18n._(
              "engine size of the motorcycle in cubic centimeters (ccm)"
            )}
          />
          <Line
            title={i18n._("Power (hp)")}
            value={selectMotorcycle.Power}
            subTitle={i18n._("max power output in horsepower (hp)")}
          />
          <Line
            title={i18n._("Torque (Nm)")}
            value={selectMotorcycle.Torque}
            subTitle={i18n._("max torque in newton-meters (Nm)")}
          />
          <Line
            title={i18n._("Engine cylinder")}
            value={selectMotorcycle.EngineCylinder}
            subTitle={i18n._(
              "number of cylinders in the engine as well as configuration"
            )}
          />
          <Line
            title={i18n._("Engine stroke")}
            value={selectMotorcycle.EngineStroke}
            subTitle={i18n._(
              "number of stages to complete one power stroke of the engine"
            )}
          />
          <Line
            title={i18n._("Transmission type")}
            value={selectMotorcycle.TransmissionType}
            subTitle={i18n._(
              "Types include: hydraulic automatic transmission, continuously variable transmission, and dual-clutch automatic transmissions"
            )}
          />
        </ScrollView>
      </View>
      {isSearch ? (
        <ModalWebView
          brand={selectMotorcycle.Brand}
          model={selectMotorcycle.Model.toString()}
          onClose={() => {
            setIsSearch(false);
          }}
        />
      ) : null}
    </>
  );
};
