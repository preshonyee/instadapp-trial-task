/* eslint-disable react-native/no-raw-text */
import React from "react";
import { StyleSheet } from "react-native";

import { COLORS } from "../utils/colors";

import { AppView } from "./appView";
import { Typography } from "./typography";

export const Logo = () => {
  return (
    <AppView style={styles.logo}>
      <Typography align="center" weight="500" size={20} color={COLORS.brand}>
        🦊 INSTADAPP
      </Typography>
    </AppView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginBottom: 40,
    marginTop: 16,
  },
});
