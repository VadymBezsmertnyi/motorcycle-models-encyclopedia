import React, { FunctionComponent, useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Shadow } from "react-native-shadow-2";
import { AntDesign } from "@expo/vector-icons";

// types
import { RootMainScreensParamList } from "../../navigation/Navigators.types";
import { MotorcycleType } from "../../providers/MotorcyclesProvider/MotorcyclesProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// helps
import { getImageTypeMoto } from "../../helps/images";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigation/Navigators.constants";

// styles
import { styles } from "./RenderItem.styles";

type RenderItemProps = {
  navigation: NativeStackNavigationProp<RootMainScreensParamList>;
  item: MotorcycleType;
};

export const RenderItem: FunctionComponent<RenderItemProps> = ({
  navigation,
  item,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <TouchableOpacity
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
              {i18n._(`Brand`)}:{" "}
              <Text style={styles.subTitle}>{item.Brand}</Text>
            </Text>
            <Text style={styles.titleItem}>
              {i18n._(`Model`)}:{" "}
              <Text style={styles.subTitle}>{item.Model}</Text>
            </Text>
          </View>
          <View style={styles.partItem}>
            <Text style={styles.titleItem}>
              {i18n._(`Year`)}: <Text style={styles.subTitle}>{item.Year}</Text>
            </Text>
            <Text style={styles.titleItem}>
              {i18n._(`Style`)}:{" "}
              <Text style={styles.subTitle}>{item.Category}</Text>
            </Text>
          </View>
          <AntDesign name="caretright" size={24} color="black" />
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};
