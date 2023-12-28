import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { AppMode } from "../constant";
// storing user data in async storage
const storeUser = async (value: object) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(value));
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
  }
};

// getting data
const getUser: any = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    if (AppMode === "dev") {
      console.log("from getuser>>>>>>>>>>" + userData);
    }
    if (userData !== null) {
      return JSON.parse(userData); // Return parsed user data if it exists
    }
    return null; // Return null if user data doesn't exist
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
    return null; // Return null in case of an error
  }
};
// clear user date when then user logout
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("user");
    if (AppMode === "dev") {
      console.log("User data cleared successfully");
    }
  } catch (error) {
    if (AppMode === "dev") {
      console.log(error);
    }
  }
};

// Function to update the user status in AsyncStorage
const updateUserStatusInStorage = async (newStatus) => {
  try {
    await AsyncStorage.setItem("@MyApp:userStatus", JSON.stringify(newStatus));
    if (AppMode === "dev") {
      console.log("User status updated in AsyncStorage:", newStatus);
    }
  } catch (error) {
    if (AppMode === "dev") {
      console.error("Error updating user status in AsyncStorage:", error);
    }
  }
};

const showToast = (message, duration = Toast.durations.LONG) => {
  Toast.show(message, {
    duration: duration,
  });
};

export {
  storeUser,
  getUser,
  clearUserData,
  updateUserStatusInStorage,
  showToast,
};
