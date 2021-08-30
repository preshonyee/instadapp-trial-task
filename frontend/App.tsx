import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContext from "./auth/authContext";
import authStorage from "./auth/authStorage";
import AppNavigation from "./navigation/AppNavigation";
import AuthNavigation from "./navigation/AuthNavigation";
import { navigationRef } from "./navigation/RootNavigation";
import { User } from "./types";

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    restoreUser();
    setOnboardingStatus();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer ref={navigationRef}>
          <>
            {user ? (
              <AppNavigation />
            ) : (
              <AuthNavigation onboardingComplete={onboardingComplete} />
            )}
          </>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
