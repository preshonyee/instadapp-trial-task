import Constants from "expo-constants";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { COLORS } from "../utils/colors";

export const AppScreen = ({ children }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        style={styles.scrollView}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
  screen: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});
