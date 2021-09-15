/* eslint-disable react-native/no-raw-text */
import { INFURA_PROJECT_ID } from "@env";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import Web3 from "web3";
import * as Yup from "yup";

import AuthContext from "../../auth/authContext";
import authStorage from "../../auth/authStorage";
import {
  AppScreen,
  AppView,
  Button,
  Input,
  Logo,
  Typography,
} from "../../components";
import AccountContext from "../../context/AccountContext";
import { COLORS } from "../../utils/colors";

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string().required().min(8).label("Password"),
  newPassword: Yup.string().required().min(8).label("Password"),
});

export const RegisterScreen = () => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);

  const registerHandler = (values: {
    readonly newPassword: string;
    readonly confirmPassword: string;
  }) => {
    if (values.newPassword === values.confirmPassword) {
      try {
        // generate random UserID
        const userID = Math.random().toString(36).substr(2, 10);
        // store password on device
        authStorage.storeCredentials("securePassword", values.confirmPassword);
        // store userID on device
        authStorage.storeCredentials("InstadappUser", userID);
        // create ether wallet account
        const web3 = new Web3(
          `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`
        );

        const newWallet = web3.eth.accounts.wallet.create(1);
        const newAccount = newWallet[0];
        // store new user account on device
        authStorage.storeCredentials(
          "InstadappAccount",
          JSON.stringify(newAccount)
        );
        // set new account to accountContext
        accountContext.setUserAccount(newAccount);
        // initiate authContext
        authContext.setUser({ passPhrase: "", userID: userID });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Passwords don't match");
    }
  };

  return (
    <AppScreen>
      <AppView>
        <Logo />
        <Typography style={styles.title} weight="bold" size={32} align="center">
          Create Password
        </Typography>
        <Typography style={styles.subtitle} align="center" size={18}>
          This password will unlock your Instadapp wallet only on this device
        </Typography>
        <Formik
          initialValues={{ confirmPassword: "", newPassword: "" }}
          onSubmit={(values) => registerHandler(values)}
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
                containerStyle={styles.input}
                label="New Password"
                hint="Must be at least 8 characters"
                secureTextEntry
                onBlur={() => setFieldTouched("newPassword")}
                onChangeText={handleChange("newPassword")}
              />
              {touched.newPassword && (
                <Typography style={styles.error}>
                  {errors.newPassword}
                </Typography>
              )}
              <Input
                containerStyle={styles.input}
                label="Confirm Password"
                hint="Must be at least 8 characters"
                secureTextEntry
                onBlur={() => setFieldTouched("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
              />
              {touched.confirmPassword && (
                <Typography style={styles.error}>
                  {errors.confirmPassword}
                </Typography>
              )}
              <Button label="Create password" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </AppView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  error: {
    color: COLORS.red,
  },
  input: {
    marginVertical: 16,
  },
  subtitle: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 16,
  },
});
