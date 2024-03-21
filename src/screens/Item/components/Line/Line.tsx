import React, { FunctionComponent, useContext } from "react";
import { Text, View } from "react-native";

// styles
import { styles } from "./Line.styles";
import { localesContext } from "../../../../../localization/localization.provider";

type LineProps = {
  title: string;
  value: string | number;
  subTitle: string;
};

export const Line: FunctionComponent<LineProps> = ({
  title,
  value,
  subTitle,
}) => {
  const { i18n } = useContext(localesContext);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.mainTitle}>{title}:</Text>
        <Text style={[styles.mainValue, !value && { opacity: 0.5 }]}>
          {value ? value : i18n._("No data available")}
        </Text>
      </View>
      <Text style={styles.other}>{subTitle}</Text>
    </View>
  );
};
