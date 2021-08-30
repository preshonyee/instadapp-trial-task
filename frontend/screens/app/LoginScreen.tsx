/* eslint-disable react-native/no-raw-text */
import { Formik } from "formik";
import React, { useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import * as Yup from "yup";

import AuthContext from "../../auth/authContext";
import authStorage from "../../auth/authStorage";
import {
  AppScreen,
  AppView,
  Button,
  Input,
  Typography,
} from "../../components";
import { COLORS } from "../../utils/colors";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
});

export const LoginScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  // handle login functionality
  const loginHandler = async (value: { readonly password: string }) => {
    // get stored user password from device storage
    const storedPassword = await authStorage.getStoredCredentials(
      "securePassword"
    );
    // get stored userID from device storage
    const storedID = await authStorage.getStoredCredentials("InstadappUser");
    // check if stored password matches entered password and if userID exists
    if (storedPassword === value.password && storedID !== undefined) {
      try {
        // initiate authContext
        authContext.setUser({ passPhrase: "", userID: storedID });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  // reset wallet functionality
  const resetWalletHandler = () => {
    authContext.setUser(null);
    authStorage.removeStoredCredentials("securePassword");
    authStorage.removeStoredCredentials("InstadappUser");
    authStorage.removeStoredCredentials("InstadappAccount");
    navigation.navigate("IntroScreen");
    Alert.alert("RESET WALLET SUCCESSFUL");
  };
  return (
    <AppScreen>
      <AppView style={styles.container}>
        <AppView style={styles.main}>
          <Typography size={80} align="center">
            🦊
          </Typography>
          <Typography size={32} weight="bold" align="center">
            Welcome Back!
          </Typography>
          <AppView style={styles.form}>
            <Formik
              initialValues={{ password: "" }}
              onSubmit={(values) => loginHandler(values)}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleSubmit,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <>
                  <Input
                    label="Password"
                    placeholder="Password"
                    hint="Must be at least 8 characters"
                    secureTextEntry
                    onBlur={() => setFieldTouched("password")}
                    onChangeText={handleChange("password")}
                  />
                  {touched.password && (
                    <Typography style={styles.error}>
                      {errors.password}
                    </Typography>
                  )}
                  <Button label="LOG IN" onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </AppView>
        </AppView>
        <AppView style={styles.reset}>
          <Typography
            style={styles.resetText}
            size={18}
            color={COLORS.gray}
            align="center">
            Can't login? You can ERASE your current wallet and setup a new one
          </Typography>
          <Button
            ghost
            label="Reset Wallet"
            variant="secondary"
            onPress={resetWalletHandler}
          />
        </AppView>
      </AppView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: COLORS.red,
  },
  form: {
    marginTop: 16,
  },
  main: {
    width: "100%",
  },
  reset: {
    marginVertical: 32,
    width: "70%",
  },
  resetText: {
    lineHeight: 24,
  },
});
