/* eslint-disable react-native/no-raw-text */
import { INFURA_PROJECT_ID } from "@env";
import { Formik } from "formik";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import Web3 from "web3";
import * as Yup from "yup";

import {
  AppScreen,
  AppView,
  Button,
  Input,
  Typography,
} from "../../components";
import { AppModal } from "../../components/modal";
import { Spacer } from "../../components/spacer";
import { COLORS } from "../../utils/colors";

type TxnType = {
  readonly messageHash: string;
  readonly r: string;
  readonly rawTransaction: string;
  readonly s: string;
  readonly transactionHash: string;
  readonly v: string;
};

const validationSchema = Yup.object().shape({
  amount: Yup.string()
    .matches(/[1-9]/, "Please put in a valid amount")
    .required()
    .label("Amount"),
  info: Yup.string().required().label("Info"),
  to: Yup.string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address")
    .required()
    .label("To"),
});

export const SendTxnScreen = ({ route }) => {
  const { address } = route.params;
  const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);

  const [showModal, setShowModal] = React.useState(false);
  const [txnInitiatedMsg, setTxnInitiatedMsg] = React.useState("");

  const sendHandler = (values: {
    readonly amount: string;
    readonly info: string;
    readonly to: string;
  }) => {
    // Variables definition
    const privKey =
      "99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342"; // Genesis private key
    const addressFrom = address;
    const addressTo = values.to;

    const gasLimit = "21000"; // 21000 is the default gas limit

    // Create transaction
    try {
      setTxnInitiatedMsg(
        `Attempting to make transaction from ${addressFrom} to ${addressTo}`
      );
      setShowModal(true);

      // create the transaction first
      web3.eth.accounts
        .signTransaction(
          {
            from: addressFrom,
            gas: gasLimit,
            to: addressTo,
            value: web3.utils.toWei(values.amount, "ether"),
          },
          privKey
        )
        .then((response: TxnType) => {
          // then deploy the transaction
          web3.eth
            .sendSignedTransaction(response.rawTransaction)
            .then((response) => {
              // if (response) {
              //   // Alert.alert(
              //   //   `Transaction successful with hash: ${response.transactionHash}`
              //   // );
              // }
            })
            .catch((error) => {
              setShowModal(false);
              Alert.alert("Error", error.message);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppScreen>
      <AppView style={styles.container}>
        <Typography size={20}>
          To send funds to a different account, fill in the details below
        </Typography>
        <AppView style={styles.form}>
          <Formik
            initialValues={{ amount: "", info: "", to: "" }}
            onSubmit={(values) => sendHandler(values)}
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
                  label="TO"
                  onBlur={() => setFieldTouched("to")}
                  onChangeText={handleChange("to")}
                />
                {touched.to && (
                  <Typography style={styles.error}>{errors.to}</Typography>
                )}
                <Input
                  label="AMOUNT"
                  onBlur={() => setFieldTouched("amount")}
                  onChangeText={handleChange("amount")}
                />
                {touched.amount && (
                  <Typography style={styles.error}>{errors.amount}</Typography>
                )}
                <Input
                  label="INFO (optional)"
                  onBlur={() => setFieldTouched("info")}
                  onChangeText={handleChange("info")}
                />
                {touched.info && (
                  <Typography style={styles.error}>{errors.info}</Typography>
                )}
                <Button label="Send" onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </AppView>
        <AppModal isVisible={showModal}>
          <Typography size={20}>{txnInitiatedMsg}</Typography>
          <Spacer mt={24} />
          <ActivityIndicator color={COLORS.brand} size="large" animating />
        </AppModal>
      </AppView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  error: {
    color: COLORS.red,
  },
  form: {
    marginVertical: 16,
  },
});
