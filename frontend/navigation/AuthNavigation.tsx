import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { LoginScreen } from "../screens/app/LoginScreen";
import { IntroScreen } from "../screens/auth/IntroScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { Onboarding } from "../screens/onboarding/Onboarding";
import { AuthNavigationParamList } from "../types";

const Stack = createNativeStackNavigator<AuthNavigationParamList>();

type AuthNavigationProps = {
  readonly onboardingComplete: boolean;
};

const AuthNavigator = ({ onboardingComplete }: AuthNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={onboardingComplete ? "LoginScreen" : "Onboarding"}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
