import * as SecureStore from "expo-secure-store";

// const key = "instadappUser";

const storeCredentials = async (key: string, userDetails: string) => {
  try {
    return await SecureStore.setItemAsync(key, userDetails);
  } catch (error) {
    console.log("Error storing the auth credentials", error);
  }
};

const getStoredCredentials = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the stored auth credentials", error);
  }
};

const removeStoredCredentials = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the stored auth credentials", error);
  }
};

export default {
  getStoredCredentials,
  removeStoredCredentials,
  storeCredentials,
};
