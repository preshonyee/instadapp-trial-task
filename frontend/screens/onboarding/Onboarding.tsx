import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import DashboardImage from "../../../assets/image/onboarding/dashboard-image.svg";
import TransactionImage from "../../../assets/image/onboarding/transaction-image.svg";
import WalletImage from "../../../assets/image/onboarding/wallet-image.svg";
import authStorage from "../../auth/authStorage";
import { AppView } from "../../components/appView";
import { COLORS } from "../../utils/colors";

import { Page } from "./Page";

export const Onboarding = ({ navigation }) => {
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current.setPage(pageNumber);
  };

  const handleOnboardingComplete = () => {
    authStorage.storeCredentials(
      "onboardingStatus",
      JSON.stringify({ status: true })
    );
    navigation.navigate("IntroScreen");
  };

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      ref={pagerRef}
      showPageIndicator>
      <AppView key="1">
        <Page
          image={<WalletImage height={300} width="100%" />}
          title="Create or Import Wallet"
          subtitle="Already have a wallet? import it here otherwise, create a new wallet"
          backgroundColor={COLORS.brand}
          rightButtonLabel="Next"
          rightButtonPress={() => {
            handlePageChange(1);
          }}
        />
      </AppView>
      <AppView key="2">
        <Page
          image={<DashboardImage height={300} width="100%" />}
          title="Dashboard Summary"
          subtitle="See your balance and wallet summary in a simple beautiful dashboard"
          backgroundColor={COLORS.brand}
          rightButtonLabel="Next"
          rightButtonPress={() => {
            handlePageChange(2);
          }}
        />
      </AppView>
      <AppView key="3">
        <Page
          image={<TransactionImage height={300} width="100%" />}
          title="Send and Receive Funds"
          subtitle="Send and receive funds from your wallet and into your wallet with ease"
          backgroundColor={COLORS.brand}
          rightButtonLabel="Continue"
          rightButtonPress={handleOnboardingComplete}
        />
      </AppView>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
