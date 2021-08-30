import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "./auth/authContext";
import authStorage from "./auth/authStorage";
import AccountContext, {
  defaultUserAccountState,
} from "./context/AccountContext";
import AppNavigation from "./navigation/AppNavigation";
import AuthNavigation from "./navigation/AuthNavigation";
import { navigationRef } from "./navigation/RootNavigation";
import { User, UserAccount } from "./types";

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [userAccount, setUserAccount] = useState<null | UserAccount>(
    defaultUserAccountState
  );

  const restoreUser = async () => {
    const cred = await authStorage.getStoredCredentials("null");
    console.log("RESTORE USER SUCCESSFUL", cred);
    if (!cred) return;
    setUser({ passPhrase: "", userID: cred });
  };

  const setOnboardingStatus = async () => {
    const storedStatus = JSON.parse(
      await authStorage.getStoredCredentials("onboardingStatus")
    );
    if (!storedStatus) return;
    setOnboardingComplete(storedStatus.status);
  };

  const getUserAccount = async () => {
    try {
      const account = await authStorage.getStoredCredentials(
        "InstadappAccount"
      );
      setTimeout(() => {
        setUserAccount(JSON.parse(account));
        setUserDataLoaded(true);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    restoreUser();
    setOnboardingStatus();
    getUserAccount();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer ref={navigationRef}>
          <>
            {user ? (
              userDataLoaded ? (
                <AccountContext.Provider
                  value={{ userAccount, setUserAccount }}>
                  <AppNavigation />
                </AccountContext.Provider>
              ) : (
                <ActivityIndicator size="large" animating />
              )
            ) : (
              <AuthNavigation onboardingComplete={onboardingComplete} />
            )}
          </>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
