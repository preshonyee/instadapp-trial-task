import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { COLORS } from "../utils/colors";

import { AppView } from "./appView";

type AppModalProps = {
  readonly isVisible: boolean;
  readonly children: React.ReactNode;
};

export const AppModal = ({ isVisible, children }: AppModalProps) => {
  return (
    <AppView style={styles.container}>
      <Modal isVisible={isVisible}>
        <AppView style={styles.inner}>{children}</AppView>
      </Modal>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {},
  inner: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    minHeight: 200,
    padding: 16,
  },
});
