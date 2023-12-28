import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomComponents/CustomButton";

type UserLockedPopupProps = {
  isVisible: boolean;
  onClose: () => void;
};
/*
 * This React functional component, UserLockedPopup, represents a modal popup displayed when a user's account is locked.
 * It receives props such as 'isVisible' (boolean) to determine whether the popup should be visible and 'onClose' (function) to handle closing the popup.
 */
function UserLockedPopup({ isVisible, onClose }: UserLockedPopupProps) {
  // Inside the modal, it contains a View ('popup') with styling to define its appearance and size.
  // It includes a Text component displaying the message informing the user that their account has been locked and to contact an administrator for assistance.
  // The Text is styled with a specific font size, centered alignment, and marginBottom to separate it from the button.
  return (
    <Modal isVisible={isVisible} style={styles.modal}
    animationIn="fadeIn"
    animationOut="fadeOut"
    useNativeDriverForBackdrop={true}
    hideModalContentWhileAnimating={false}
    onBackdropPress={onClose}
    >
      <View style={styles.popup}>
        <Text style={styles.text}>
          Your account has been locked. Contact administrator for assistance.
        </Text>
        <View style={styles.buttonContainer}>
          <CustomButton title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    height: 250,
    backgroundColor: "white",
    width: 300,
    padding: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 80,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default UserLockedPopup;
