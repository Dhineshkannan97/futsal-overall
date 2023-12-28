import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { primarycolor } from "../../constant";

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
};
/*
 * It accepts props such as 'title' (string) for the button text, 'onPress' (function) for the button press action, and an optional 'style' prop for customizing button styles.
 * The button is implemented using TouchableOpacity from React Native, providing touchable feedback on press.
 */
export default function CustomButton({ title, onPress, style }: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: primarycolor,
    width: 134,
    height: 44,
    padding: 10,
    borderRadius: 33,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
