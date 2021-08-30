/* eslint-disable react-native/no-raw-text */
import { INFURA_PROJECT_ID } from "@env";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Web3 from "web3";

import authStorage from "../../auth/authStorage";
import { AppScreen, AppView, Button, Typography } from "../../components";
import { Spacer } from "../../components/spacer";
import { defaultUserAccountState } from "../../context/AccountContext";
import { UserAccount } from "../../types";
import { COLORS } from "../../utils/colors";

type ContractBalance = {
  readonly id: number;
  readonly jsonrpc: string;
  readonly result: string;
};

type ExchangeRate = {
  readonly BTC: number;
  readonly EUR: number;
  readonly USD: number;
};

export const DashboardScreen = ({ navigation }) => {
  const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);

  const [userAccount, setUserAccount] = useState<null | UserAccount>(
    defaultUserAccountState
  );

  const [contractBalance, setContractBalance] = useState("");
  const [contractBalanceLoaded, setContractBalanceLoaded] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0.0);

  const URL = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

  const exChangeRateURL =
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

  const getContractBalanceData = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getBalance",

    params: [userAccount.address, "latest"],
  });

  const config = {
    data: getContractBalanceData,
    headers: {},
  };

  const getContractBalance = () => {
    try {
      axios
        .post(URL, getContractBalanceData, config)
        .then((response) => {
          const result: ContractBalance = response.data;
          // convert contract balance to Ether
          const contractBalanceInEther = web3.utils.fromWei(
            result.result,
            "ether"
          );
          // //  format to 2 decimal places
          const fixedEtherBalance = Number(contractBalanceInEther).toFixed(2);
          setContractBalance(fixedEtherBalance);
          setContractBalanceLoaded(true);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAccount = async () => {
    try {
      const account = await authStorage.getStoredCredentials(
        "InstadappAccount"
      );
      setUserAccount(JSON.parse(account));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, []);

  useEffect(() => {
    getContractBalance();
    checkExchangeRates();
  }, [userAccount.address]);

  const checkExchangeRates = () => {
    axios.get(exChangeRateURL).then((response) => {
      const result: ExchangeRate = response.data;
      setExchangeRate(result.USD);
    });
  };

  const contractBalanceInUSD = (Number(contractBalance) * exchangeRate).toFixed(
    2
  );

  return (
    <AppScreen>
      {!contractBalanceLoaded ? (
        <AppView style={styles.spinner}>
          <ActivityIndicator size="large" animating />
        </AppView>
      ) : (
        <AppView style={styles.container}>
          <Spacer my={24} />
          <Typography>Ethereum balance</Typography>
          <Typography
            style={styles.eth}
            color={COLORS.brand}
            size={48}
            weight="bold">
            {`${Number(contractBalance).toLocaleString()} ETH`}
          </Typography>
          <Spacer my={16} />
          <Typography>Equivalent in USD</Typography>
          <Typography
            style={styles.usd}
            color={COLORS.gray}
            weight="500"
            size={40}>
            {`$${Number(contractBalanceInUSD).toLocaleString()}`}
          </Typography>
          <Spacer my={8} />
          <Typography>Your Wallet Address</Typography>
          <Spacer my={4} />
          {userAccount === null ? (
            <ActivityIndicator size="large" animating />
          ) : (
            <Typography size={18}>{userAccount.address}</Typography>
          )}
          <Spacer my={16} />
          <Button
            onPress={() =>
              navigation.navigate("SendScreen", {
                address: userAccount.address,
              })
            }
            label="Send"
          />
          <Button
            onPress={() =>
              navigation.navigate("ReceiveScreen", {
                address: userAccount.address,
              })
            }
            label="Receive"
          />
        </AppView>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},
  eth: {
    marginVertical: 8,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
  },
  usd: {
    marginVertical: 8,
  },
});
