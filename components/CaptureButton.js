import React from "react";
import { StyleSheet, Button, TouchableOpacity, View } from "react-native";

export default class CaptureButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.captureButton}
        disabled={this.props.buttonDisabled}
        onPress={this.props.onClick}
      >
        <View style={styles.capture} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  captureButton: {
    marginBottom: 30,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 10,
    borderColor: "#rgba(255,255,255,0.5)"
  }
});
