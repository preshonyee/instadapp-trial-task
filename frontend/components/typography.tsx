import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

import { COLORS } from "../utils/colors";

type TypographyProps = {
  readonly align?: "left" | "center" | "right";
  readonly color?: string;
  readonly children: React.ReactNode;
  readonly size?: number;
  readonly style?: StyleProp<TextStyle>;
  readonly weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export const Typography = ({
  align,
  children,
  color,
  weight,
  size,
  style,
}: TypographyProps) => {
  return (
    <View>
      <Text
        style={[
          styles.text,
          color && { color: color },
          {
            fontSize: size,
            fontWeight: weight,
            textAlign: align,
          },
          style,
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
  },
});
