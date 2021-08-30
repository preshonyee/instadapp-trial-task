/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable functional/no-mixed-type */

/* eslint-disable functional/no-return-void */

export type AppNavigationParamList = {
  readonly DashboardScreen: undefined;
  readonly SendScreen: undefined;
  readonly ReceiveScreen: undefined;
};

export type AuthNavigationParamList = {
  readonly IntroScreen: undefined;
  readonly Onboarding: undefined;
  readonly LoginScreen: undefined;
  readonly RegisterScreen: undefined;
};

export type OnboardingNavigationParamList = {
  readonly Onboarding: undefined;
};

export type User = {
  readonly passPhrase: string;
  readonly userID: string;
};

export type AuthContextType = {
  readonly setUser: (User: User | null) => void;
  readonly user: null | User;
};

export type UserAccount = {
  readonly address: string;
  readonly encrypt: Function;
  readonly index?: number;
  readonly privateKey: string;
  readonly sign: Function;
  readonly signTransaction: Function;
};

export type AccountContextType = {
  readonly setUserAccount: (UserAccount: UserAccount | null) => void;
  readonly userAccount: null | UserAccount;
};
