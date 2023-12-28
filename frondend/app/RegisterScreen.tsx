import { RouteNavigationParam } from "../functions/types";
import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Platform } from "react-native";
import { TextEdit } from "../components/CustomComponents/CustomPlaceHolder";
import CustomButton from "../components/CustomComponents/CustomButton";
import { apiGetUserData } from "../functions/api";
import Toast from "react-native-root-toast";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { AppMode, USERNAME_EXISTS, USER_REGISTERED } from "../constant";
import { showToast } from "../functions/utils";
/*
 * Functional component for User Registration Screen
 * prpos navigation
 */
export default function UserRegisterScreen({
  navigation,
}: RouteNavigationParam) {
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  // Function to handle registration button press
  const handleRegisterButton = async () => {
    if (AppMode === "dev") {
      console.log("userName in registerscreen : >>>>>", userName);
      console.log("password in registerscreen :", password);
      console.log("confirmPassword in registerscreen :", confirmPassword);
    }
    // Validation checks for username, password, and confirmation
    // Further API interaction for user registration
    if (userName.length >= 5) {
      if (password == confirmPassword) {
        if (AppMode === "dev") {
          console.log("password and confirmPassword match");
        }
        if (password.length == 8) {
          // await sendPostRequest(userName, password);
          let userData = await apiGetUserData(
            {
              username: userName,
              password: confirmPassword,
            },
            "register"
          );
          const parseduserData = JSON.parse(userData);
          // apiResponse = "User Registered Successfully";

          if (parseduserData != null && parseduserData.status == 201) {
            Keyboard.dismiss();
            showToast(parseduserData.message); //User Registered Successfully
            navigation.navigate("Login");
          } else if (parseduserData != null && parseduserData.status == 409) {
            Keyboard.dismiss();
            showToast(parseduserData.message); //user name already exsist
          }
        } else {
          Keyboard.dismiss();
          if (AppMode === "dev") {
            console.log("password must be 8 characters");
          }
          showToast("password must be 8 characters");
        }
      } else {
        Keyboard.dismiss();
        if (AppMode === "dev") {
          console.log("password and confirmPassword does not match");
        }
        showToast("password and confirmPassword does not match");
      }
    } else {
      Keyboard.dismiss();
      if (AppMode === "dev") {
        console.log("userName should have 5 to 30 characters");
      }
      showToast("userName should have 5 to 30 characters");
    }
  };
  // Function to dismiss the keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleOnPress = () => {
    // need to call a api or stroe the data for cache
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <TextEdit
            placeholder="UserName"
            onPressIn={handleOnPress}
            editable={true}
            keyboardType="default"
            maxTextLength={30}
            onChangeText={(v: any) => {
              setUserName(v);
            }}
            value={userName}
            secureTextEntry={false}
          />
          <TextEdit
            placeholder="CreatePassword"
            onPressIn={handleOnPress}
            editable={true}
            keyboardType="default"
            maxTextLength={8}
            onChangeText={(v: any) => {
              setPassword(v);
            }}
            value={password}
            showPasswordIcon={true} // Pass showPasswordIcon prop to display the icon
            secureTextEntry={true}
          />
          <TextEdit
            placeholder="ConfrimPassword"
            onPressIn={handleOnPress}
            editable={true}
            keyboardType="default"
            maxTextLength={8}
            onChangeText={(v: any) => {
              setConfirmPassword(v);
            }}
            value={confirmPassword}
            showPasswordIcon={true} // Pass showPasswordIcon prop to display the icon
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <CustomButton title="Register" onPress={handleRegisterButton} />
          </View>
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
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
