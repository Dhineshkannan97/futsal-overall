import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomComponents/CustomButton";

type Props = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
  message?: string;
};
/*
 * This React functional component, ConfirmationPopup, represents a modal popup used for confirmation messages or actions.
 * It receives props like 'isVisible' (boolean) to determine whether the popup should be visible, 'onConfirm' (function) to handle confirmation action,
 * 'onCancel' (function) to handle cancellation action, 'onClose' (optional function) to handle closing the popup, and 'message' (optional string) to display a custom message.
 */
function ConfirmationPopup({ isVisible, onConfirm, onCancel }: Props) {
  return (
    <Modal isVisible={isVisible} style={styles.modal}
    animationIn="fadeIn"
    animationOut="fadeOut"
    useNativeDriverForBackdrop={true}
    hideModalContentWhileAnimating={false}
    >
      <View style={styles.popup}>
        <Text style={styles.text}>Are you sure you want to log out?</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Confirm"
            onPress={onConfirm}
            style={styles.confirmButton}
          />
          <CustomButton
            title="Cancel"
            onPress={onCancel}
            style={styles.cancelButton}
          />
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
    backgroundColor: "white",
    width: 300,
    height: 170,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  confirmButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default ConfirmationPopup;
