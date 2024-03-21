import React, { FunctionComponent, useContext, useMemo } from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";

// providers
import { motorcyclesContext } from "../../providers/MotorcyclesProvider/MotorcyclesProvider";

// styles
import { styles } from "./Item.styles";

type ItemProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
  route: RouteProp<RootMainScreensParamList, "item">;
};

export const Item: FunctionComponent<ItemProps> = ({ navigation, route }) => {
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const selectMotorcycle = useMemo(
    () => motorcyclesDB.find((moto) => moto.id === route.params.motoId) || null,
    [route.params.motoId, motorcyclesDB]
  );

  console.log("selectMotorcycle", selectMotorcycle);

  if (!selectMotorcycle) navigation.goBack();

  return <View style={styles.container}></View>;
};
