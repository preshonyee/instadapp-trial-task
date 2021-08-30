/* eslint-disable functional/prefer-type-literal */
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

import { COLORS } from "../utils/colors";

import { Typography } from "./typography";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly hint?: string;
  readonly label: string;
  readonly placeholder?: string;
}

export const Input = ({
  containerStyle,
  hint,
  label,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Typography style={styles.label}>{label}</Typography>
      <TextInput placeholder={placeholder} style={styles.input} {...rest} />
      {hint && <Typography style={styles.hint}>{hint}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  hint: {
    color: COLORS.gray,
    marginTop: 4,
  },
  input: {
    borderColor: COLORS.border,
    borderRadius: 4,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});
