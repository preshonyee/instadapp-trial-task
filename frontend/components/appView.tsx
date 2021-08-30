import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { COLORS } from "../utils/colors";

type AppViewProps = {
  readonly children: React.ReactNode;
  readonly debug?: boolean;
  readonly style?: StyleProp<ViewStyle>;
};

export const AppView = ({ children, debug, style }: AppViewProps) => {
  return <View style={[debug && styles.debug, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  debug: {
    borderColor: COLORS.red,
    borderWidth: 1,
  },
});
