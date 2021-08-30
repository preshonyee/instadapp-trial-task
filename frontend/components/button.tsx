/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-mixed-type */
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { COLORS } from "../utils/colors";

import { Typography } from "./typography";

type ButtonProps = {
  readonly ghost?: boolean;
  readonly label: string;
  readonly variant?: "primary" | "secondary";
  readonly onPress?: () => void;
  readonly style?: StyleProp<ViewStyle>;
};

export const Button = ({
  ghost,
  label,
  onPress,
  style,
  variant = "primary",
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {variant === "primary" ? (
        <View style={[styles.container, styles.primaryContainer, style]}>
          <Typography weight="500" size={16} color={COLORS.white}>
            {label}
          </Typography>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            styles.secondaryContainer,
            style,
            ghost && styles.ghost,
          ]}>
          <Typography weight="500" size={ghost ? 20 : 16} color={COLORS.brand}>
            {label}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.brand,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 188,
    paddingVertical: 16,
    width: "100%",
  },
  ghost: {
    borderWidth: 0,
  },
  primaryContainer: {},
  secondaryContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.brand,
    borderWidth: 1,
  },
});
