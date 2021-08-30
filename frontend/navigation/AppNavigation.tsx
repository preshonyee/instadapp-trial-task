import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { DashboardScreen } from "../screens/app/DashboardScreen";
import { ReceiveTxnScreen } from "../screens/app/ReceiveTxnScreen";
import { SendTxnScreen } from "../screens/app/SendTxnScreen";
import { AppNavigationParamList } from "../types";

const AppStack = createNativeStackNavigator<AppNavigationParamList>();

export default function AppNavigation() {
  return (
    <>
      <AppStack.Navigator initialRouteName="DashboardScreen">
        <AppStack.Screen name="DashboardScreen" component={DashboardScreen} />
        <AppStack.Screen
          name="SendScreen"
          component={SendTxnScreen}
          options={{
            headerTitle: "Send Funds",
            headerTitleStyle: { fontSize: 24 },
          }}
        />
        <AppStack.Screen
          name="ReceiveScreen"
          component={ReceiveTxnScreen}
          options={{
            headerTitle: "Receive Funds",
            headerTitleStyle: { fontSize: 24 },
          }}
        />
      </AppStack.Navigator>
    </>
  );
}
