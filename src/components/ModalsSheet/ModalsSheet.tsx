import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

// providers
import { localesContext } from "../../../localization/localization.provider";

// styles
import { styles } from "./ModalsSheet.styles";
import { Shadow } from "react-native-shadow-2";

type ModalsSheetProps = {
  isShow?: boolean;
  onChange?: () => void;
  isShowClose?: boolean;
  onClose: () => void;
  footer?: JSX.Element;
  snapPointsProps?: string[];
  isIndicator?: boolean;
  children: JSX.Element;
  title: string;
};

export const ModalsSheet: FunctionComponent<ModalsSheetProps> = ({
  isShow = true,
  onChange,
  isShowClose = true,
  onClose,
  footer,
  snapPointsProps,
  isIndicator = false,
  children,
  title,
}) => {
  const { i18n } = useContext(localesContext);
  const handleIndicatorStyle = useMemo(
    () =>
      ({
        display: isIndicator ? "flex" : "none",
      } as ViewStyle),
    [isIndicator]
  );
  const snapPoints = useMemo(() => {
    const defaultSnapPoints = Platform.OS === "ios" ? ["90%"] : ["95%"];
    return snapPointsProps ? snapPointsProps : defaultSnapPoints;
  }, [snapPointsProps]);

  const handleComponent = () => (
    <Shadow stretch style={styles.shadowHeader}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.titleHeader}>
          {title}
        </Text>
        <TouchableOpacity
          accessibilityLabel={i18n._("Button for closing the modal window")}
          style={styles.buttonHeader}
          onPress={onClose}
        >
          <AntDesign name="close" size={24} color={"black"} />
        </TouchableOpacity>
      </View>
    </Shadow>
  );

  const footerComponent = useCallback(
    () =>
      footer ? (
        <BlurView intensity={40} tint="dark" style={styles.footerBlur}>
          {footer}
        </BlurView>
      ) : null,
    [footer]
  );

  if (!isShow) return null;

  return (
    <Modal visible={isShow} transparent>
      <TouchableOpacity
        accessibilityLabel={i18n._(
          "Background overlay for closing the modal window"
        )}
        style={styles.footerButton}
        onPress={onClose}
      >
        <BlurView intensity={15} style={styles.footerButtonBlurView} />
      </TouchableOpacity>
      <BottomSheet
        onChange={onChange}
        handleComponent={isShowClose ? handleComponent : undefined}
        footerComponent={footerComponent}
        onClose={onClose}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundModalStyle}
        handleIndicatorStyle={handleIndicatorStyle}
      >
        {children}
      </BottomSheet>
    </Modal>
  );
};
