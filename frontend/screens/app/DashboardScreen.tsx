/* eslint-disable react-native/no-raw-text */
import { INFURA_PROJECT_ID, TheDAO_Withdraw_Contract } from "@env";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Web3 from "web3";

import { AppScreen, AppView, Button, Typography } from "../../components";
import { Spacer } from "../../components/spacer";
import AccountContext from "../../context/AccountContext";
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

  const { userAccount } = useContext(AccountContext);
  const [contractBalance, setContractBalance] = useState({} as ContractBalance);
  const [contractBalanceLoaded, setContractBalanceLoaded] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0.0);

  const URL = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;

  const exChangeRateURL =
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

  const getContractBalanceData = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [
      userAccount.address ? userAccount.address : TheDAO_Withdraw_Contract,
      "latest",
    ],
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
          const result = response.data;
          setContractBalance(result);
          setContractBalanceLoaded(true);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContractBalance();
    checkExchangeRates();
  }, []);

  const checkExchangeRates = () => {
    axios.get(exChangeRateURL).then((response) => {
      const result: ExchangeRate = response.data;
      setExchangeRate(result.USD);
    });
  };

  const contractBalanceToEther = (contractBalance: string) => {
    // convert contract balance to Ether
    const contractBalanceInEther = web3.utils.fromWei(contractBalance, "ether");
    // //  format to 2 decimal places
    const fixedEtherBalance = Number(contractBalanceInEther).toFixed(2);
    // // format with comma separated values
    const formattedEtherBalance = Number(fixedEtherBalance).toLocaleString();
    return formattedEtherBalance;
  };

  const convertEtherToUSD = (contractBalance: string) => {
    // convert contract balance to Ether
    const contractBalanceInEther = web3.utils.fromWei(contractBalance, "ether");
    // multiply by exchange rate
    const contractBalanceInUSD = Number(contractBalanceInEther) * exchangeRate;
    // format to 2 decimal places
    const fixedUSDBalance = Number(contractBalanceInUSD).toFixed(2);
    // format with comma separated values
    const formattedUSDBalance = Number(fixedUSDBalance).toLocaleString();
    return formattedUSDBalance;
  };

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
            {`${contractBalanceToEther(contractBalance.result)} ETH`}
          </Typography>
          <Spacer my={16} />
          <Typography>Equivalent in USD</Typography>
          <Typography
            style={styles.usd}
            color={COLORS.gray}
            weight="500"
            size={40}>
            {`$${convertEtherToUSD(contractBalance.result)}`}
          </Typography>
          <Spacer my={8} />
          <Typography>Your Wallet Address</Typography>
          <Spacer my={4} />
          {userAccount === null ? (
            <ActivityIndicator size="small" animating />
          ) : (
            <Typography size={18}>{userAccount.address}</Typography>
          )}
          <Spacer my={16} />
          <Button
            onPress={() => navigation.navigate("SendScreen")}
            label="Send"
          />
          <Button
            onPress={() => navigation.navigate("ReceiveScreen")}
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
