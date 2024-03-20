import React, { FunctionComponent, useMemo, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// styles
import { styles } from "./Input.styles";

type InputProps = {
  placeholder: string;
  value?: string;
  label?: string;
  defaultValue?: string;
  onChange: (k: string) => void;
  InputIcon?: React.ReactNode;
  customStyles?: ViewStyle;
  labelStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  isRegular?: boolean;
  isSelect?: boolean;
  maxLength?: number;
  accessibilityLabel?: string;
  disabled?: boolean;
};

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value,
  label,
  defaultValue,
  InputIcon,
  onChange,
  customStyles,
  labelStyle,
  keyboardType = "default",
  errorMessage,
  containerStyle,
  isRegular = false,
  isSelect = false,
  maxLength,
  accessibilityLabel,
  disabled = false,
}) => {
  const [borderColor, setBorderColor] = useState("gray");

  const onFocus = () => {
    setBorderColor("orange");
  };

  const onBlur = () => {
    setBorderColor("gray");
  };

  const inputWrapperStyles = useMemo(
    () => ({
      ...styles.inputWrapper,
      borderColor: errorMessage ? "red" : borderColor,
    }),
    [borderColor, errorMessage]
  );
  const inputStyles: StyleProp<TextStyle> = useMemo(
    () => ({ ...styles.input, ...customStyles }),
    [customStyles]
  );
  const containerStyles = useMemo(() => {
    const marginTop = label ? 20 : 0;
    return {
      ...styles.container,
      marginTop,
      flex: customStyles ? 1 : 0,
      ...containerStyle,
      opacity: disabled ? 0.5 : 1,
    };
  }, [label, customStyles, containerStyle, disabled]);

  const labelStyles = useMemo(() => [styles.label, labelStyle], [labelStyle]);

  const titleMaxLengthStyles = useMemo(
    () => [
      styles.titleMaxLength,
      errorMessage ? styles.titleMaxLengthError : undefined,
    ],
    [errorMessage]
  );

  const onChangeText = (newValue: string) => {
    if (!maxLength) onChange(newValue);
    else if (newValue.length <= maxLength) onChange(newValue);
  };
  return (
    <View style={containerStyles}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {isSelect ? ":" : null}
          {isRegular ? (
            <>
              :<Text style={styles.labelRegular}>*</Text>
            </>
          ) : null}
        </Text>
      )}
      <View style={inputWrapperStyles}>
        <TextInput
          editable={!disabled}
          selectTextOnFocus={!disabled}
          style={inputStyles}
          accessibilityLabel={accessibilityLabel}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          textAlignVertical={customStyles ? "top" : "center"}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={customStyles ? true : false}
          keyboardType={keyboardType}
        />
        {InputIcon}
      </View>
      {value !== undefined && maxLength ? (
        <View style={styles.containerMaxLength}>
          <Text style={titleMaxLengthStyles}>
            {value.length}/{maxLength}
          </Text>
        </View>
      ) : null}
      {errorMessage !== undefined ? (
        <Text style={styles.errorMessage}>{errorMessage || ""}</Text>
      ) : null}
    </View>
  );
};
