import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

// types
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";

// providers
import { motorcyclesContext } from "../../providers/MotorcyclesProvider/MotorcyclesProvider";

export const Main: FunctionComponent = () => {
  const { motorcyclesDB } = useContext(motorcyclesContext);
  const showMotorcycles = useMemo(
    () => motorcyclesDB.splice(0, 20),
    [motorcyclesDB]
  );

  const renderItem: ListRenderItem<MotorcycleType> = ({ item }) => {
    return (
      <TouchableOpacity key={`moto-${item.id}`}>
        <View>
          <Text>{item.Model}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Shadow stretch distance={4}>
        <View>
          <AntDesign name="setting" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      </Shadow>
      <FlatList
        data={showMotorcycles}
        renderItem={renderItem}
        onEndReached={(info) => {
          console.log("info", info);
        }}
      />
    </View>
  );
};
