import { RouteNavigationParam, UserData } from "../functions/types";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import CustomButton from "../components/CustomComponents/CustomButton";
import InvalidLoginPopup from "../components/PopupComponents/InValidLoginPopup";
import { TextEdit } from "../components/CustomComponents/CustomPlaceHolder";
import { getUser, showToast, storeUser } from "../functions/utils";
import Toast from "react-native-root-toast";
import UserLockedPopup from "../components/PopupComponents/UserLockedPopup";
import {
  AppMode,
  INVALID_PASSWORD,
  LOGIN_SUCCESSFUL,
  USER_BLOCKED_MESSAGE,
  USER_NOT_FOUND,
} from "../constant";
import { apiGetUserData } from "../functions/api";

/*
 * login screen functional component that takes navigation as a prop
 */
export default function UserLogInScreen({ navigation }: RouteNavigationParam) {
  const [showInvalidLoginPopup, setShowInvalidLoginPopup] = useState(false);
  const [showUserLockedPopup, setShowUserLockedPopup] = useState(false);
  const [userName, setUser] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  // useEffect hook for cleaning up state when navigating away from the screen
  useEffect(() => {
    const cleanPlaceHolder = navigation.addListener("blur", () => {
      // Resetting the state when navigating away from this screen
      setUser("");
      setPassword("");
    });
    return cleanPlaceHolder;
  }, [navigation]);
  // Function handling login button press
  const handleLoginButton = async () => {
    // Checking for username and password validity
    if (AppMode === "dev") {
      console.log("username in the login screen : ", userName);
      console.log("password in the login screen : ", password);
    }
    if (userName.length > 0 && password.length > 0) {
      // Performing login API call
      const userData: any = await apiGetUserData(
        {
          username: userName,
          password: password,
        },
        "login"
      );
      // Parsing API response
      const parsedResult: UserData = JSON.parse(userData);
      if (AppMode === "dev") {
        console.log("apiResponse in login screen : ", parsedResult.message);
      }
      // Handling different scenarios based on API response message
      if (parsedResult != null) {
        // Successful login
        if (parsedResult.status == 200) {
          showToast(parsedResult.message);
          // Displaying success message and navigating to Dashboard
          // Also storing user data
          // Show toast notification
          // Navigate to Dashboard
          storeUser(parsedResult.data);
          // getUser();
          navigation.navigate("Dashboard");
          if (AppMode === "dev") {
            console.log(parsedResult.message);
          }
        } else if (parsedResult.status == 401) {
          // Handling invalid password scenario
          Keyboard.dismiss();
          showToast(parsedResult.message);
          if (AppMode === "dev") {
            console.log(parsedResult.message);
          }
        } else if (parsedResult.status == 404) {
          // Handling user not found scenario
          Keyboard.dismiss();
          showToast(parsedResult.message);
        } else if (parsedResult.status == 403) {
          // Handling user blocked scenario
          setShowUserLockedPopup(true);
        }
      }
    } else {
      // Handling case where username or password is empty
      if (AppMode === "dev") {
        console.log("Username and Password cannot be empty");
      }
      setShowInvalidLoginPopup(true);
    }
  };
  const handleRegisterButton = () => {
    // Function for handling register button press, navigating to Register screen
    navigation.navigate("Register");
    if (AppMode === "dev") {
      console.log("Redirecting to the registration screen");
    }
  };
  // Function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    // KeyboardAvoidingView to handle keyboard behavior
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <TextEdit
            placeholder="UserName"
            editable={true}
            keyboardType="default"
            onChangeText={(v: any) => {
              setUser(v);
            }}
            value={userName}
            secureTextEntry={false}
          />
          <TextEdit
            placeholder="Password"
            editable={true}
            keyboardType="default"
            onChangeText={(v) => {
              setPassword(v);
            }}
            value={password}
            showPasswordIcon={true} // Pass showPasswordIcon prop to display the icon
            secureTextEntry={true}
          />

          <View>
            <View
              style={{
                padding: 40,
                gap: 23,
              }}
            >
              <CustomButton title="login" onPress={handleLoginButton} />
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                or
              </Text>
              <CustomButton title="register" onPress={handleRegisterButton} />
            </View>
          </View>
          <InvalidLoginPopup
            isVisible={showInvalidLoginPopup}
            onClose={() => setShowInvalidLoginPopup(false)}
          />
          <UserLockedPopup
            isVisible={showUserLockedPopup}
            onClose={() => setShowUserLockedPopup(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
