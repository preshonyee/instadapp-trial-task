/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { AppView } from ".";

type FlexProps = {
  readonly children: React.ReactNode;
  readonly debug?: boolean;
  readonly width?: string;
  readonly direction?: "row" | "column";
  readonly justify?:
    | "space-between"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-evenly"
    | "flex-start";
  readonly alignContent?: "flex-end" | "center";
  readonly alignItems?: "flex-end" | "center" | "stretch" | "flex-start";
  readonly alignSelf?: "flex-end" | "center" | "stretch" | "flex-start";
  readonly style?: StyleProp<ViewStyle>;
  readonly wrap?: boolean;
};

export const AppFlex = ({
  children,
  debug,
  width,
  direction = "row",
  justify,
  alignSelf,
  alignItems,
  alignContent,
  style,
  wrap,
}: FlexProps) => {
  return (
    <AppView
      debug={debug}
      style={[
        style,
        wrap && styles.wrap,
        {
          alignContent: alignContent,
          alignItems: alignItems,
          alignSelf: alignSelf,
          flexDirection: direction,
          justifyContent: justify,
          width: width ? width : "100%",
          ...styles.flex,
        },
      ]}>
      {children}
    </AppView>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
  },
  wrap: {
    flexWrap: "wrap",
  },
});
