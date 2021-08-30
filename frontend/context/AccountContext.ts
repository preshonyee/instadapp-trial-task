import { createContext } from "react";

import { AccountContextType, UserAccount } from "../types";

export const defaultUserAccountState = {
  address: "",
  encrypt: null,
  index: 0,
  privateKey: "",
  sign: null,
  signTransaction: null,
} as UserAccount;

const AccountContext = createContext<AccountContextType>({
  setUserAccount: () => console.warn("No account details found"),
  userAccount: defaultUserAccountState,
});

export default AccountContext;
