import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, TextInput } from "react-native";
import * as React from "react";
import { primarycolor } from "../../constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  placeholder: any;
  editable: any;
  keyboardType: any;
  onChangeText: any;
  value: any;
  maxTextLength?: number;
  numberOfLines?: any;
  onPressIn?: (e: any) => void;
  multiline?: any;
  bottomline?: boolean;
  showPasswordIcon?: boolean;
  secureTextEntry?: boolean;
};
/*
 * This React functional component, TextEdit, creates a customizable text input field in a React Native application.
 * It utilizes the useState hook to manage focus state and toggles the appearance of the input based on focus.
 * The component receives various props to configure the text input's behavior and appearance.
 */
export const TextEdit = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = (text: any) => {
    props.onChangeText(text);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const updatedPlaceholder = isFocused ? null : props.placeholder;

  return (
    <View style={styles.textBoxContainer}>
      {props.value || isFocused ? (
        <View style={styles.labelContainer}>
          <Text style={styles.lableText}>{props.placeholder}</Text>
        </View>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          { borderWidth: props.bottomline ? 0 : 0.5 },
          { borderBottomWidth: props.bottomline ? 2 : 0.5 },
        ]}
      >
        <TextInput
          placeholder={updatedPlaceholder}
          placeholderTextColor={"gray"}
          style={styles.inputText}
          value={props.value}
          onChangeText={handleTextChange}
          onPressIn={props.onPressIn}
          // multiline={true}
          maxLength={props.maxTextLength ? props.maxTextLength : 500}
          editable={props.editable == true ? true : false}
          keyboardType={props.keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          numberOfLines={1}
          cursorColor={primarycolor}
          secureTextEntry={props.secureTextEntry && !showPassword}
        />
        {props.showPasswordIcon && ( // Check if showPasswordIcon prop is true
          <View style={{ position: "absolute", right: 10, top: 10 }}>
            <MaterialCommunityIcons
              name={!showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxContainer: {
    marginVertical: 6,
  },
  labelContainer: {
    backgroundColor: "#f2f2f2",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
    marginStart: 2,
    zIndex: 1,
    position: "absolute",
    top: -10,
    // bottom: 15,
    flexWrap: "wrap",
    left: 4,
  },
  inputContainer: {
    width: Dimensions.get("window").width - 40,
    minHeight: 50,
    // height: 50,
    flexDirection: "row",
    borderColor: "black",
    // flexWrap: "wrap",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 4,
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerFocused: {
    width: Dimensions.get("window").width - 40,
    minHeight: 50,
    flexDirection: "row",
    borderColor: primarycolor,
    borderWidth: 8,
    borderRadius: 8,
    // padding: 10,
    zIndex: 0,
  },
  lableText: {
    color: primarycolor,
    fontSize: 15,
    fontVariant: ["lining-nums"],
  },
  inputText: {
    color: "black",
    fontSize: 16,
    fontVariant: ["lining-nums"],
    width: "100%",
    // backgroundColor:"red"
  },
  icon: {
    marginLeft: 10,
  },
});
