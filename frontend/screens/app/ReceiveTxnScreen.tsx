/* eslint-disable react-native/no-raw-text */
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import { AppScreen, AppView, Button, Typography } from "../../components";
import { COLORS } from "../../utils/colors";

export const ReceiveTxnScreen = ({ route }) => {
  const { address } = route.params;

  // Copy to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(address);
    Alert.alert("Copied to clipboard");
  };

  return (
    <AppScreen>
      <AppView style={styles.container}>
        <Typography style={styles.qrText} size={24}>
          QR Code
        </Typography>
        <QRCode value={address} />
        <Typography style={styles.code} color={COLORS.gray} size={20}>
          {address}
        </Typography>
        <Button label="Share" onPress={copyToClipboard} />
      </AppView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  code: {
    marginVertical: 32,
  },
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  qrText: {
    marginVertical: 16,
  },
});
