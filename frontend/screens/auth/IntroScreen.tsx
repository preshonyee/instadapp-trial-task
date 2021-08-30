/* eslint-disable react-native/no-raw-text */
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import authStorage from "../../auth/authStorage";
import { AppScreen, AppView, Button, Logo, Typography } from "../../components";

export const IntroScreen = ({ navigation }) => {
  useEffect(() => {
    authStorage.removeStoredCredentials("securePassword");
    authStorage.removeStoredCredentials("InstadappUser");
    authStorage.removeStoredCredentials("InstadappAccount");
  }, []);
  return (
    <AppScreen>
      <AppView style={styles.container}>
        <Logo />
        <AppView>
          <Typography align="center" weight="bold" size={28}>
            Wallet Setup
          </Typography>
          <Typography style={styles.subtitle} align="center" size={16}>
            Import an existing wallet or create a new one
          </Typography>
        </AppView>
        <AppView style={styles.content}>
          <Button
            label="Import using Secret Recovery Phrase"
            variant="secondary"
          />
          <Button
            onPress={() => navigation.navigate("RegisterScreen")}
            label="Create a new wallet"
            variant="primary"
          />
        </AppView>
      </AppView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 2,
    justifyContent: "center",
  },
  subtitle: {
    marginVertical: 16,
  },
});
