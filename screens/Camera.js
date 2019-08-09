import React from "react";
import {
  View,
  Dimensions,
  Alert,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar
} from "react-native";
import { RNCamera } from "react-native-camera";
import CaptureButton from "../components/CaptureButton.js";
import { materials } from "../data/materials";

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  /*takePicture() {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => {
          var imagePath = data.path;
          this.props.navigator.push({
            title: "Add Filter",
            screen: "Gym.FilterScreen",
            imageuri: imagePath
          });
        })
        .catch(err => console.error(err));
    }
  }*/

  takePicture = async function() {
    this.setState({
      loading: true
    });
    var imagePath;
    if (this.camera) {
      //this.camera.pausePreview();

      const options = {
        quality: 0.5,
        base64: true,
        fixOrientation: true,
        orientation: "portrait"
      };
      const data = await this.camera.takePictureAsync(options);
      //console.log("picture taken: ", data);

      this.goToResults(data);
    }
  };

  goToResults = d => {
    //console.log("go to results!: ", d);
    this.setState({
      loading: false
    });
    this.props.navigation.navigate("Results", {
      photoUri: d.uri,
      photo64: d.base64
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          barStyle="light-content"
          translucent
          animated
        />
        {this.state.loading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#fff"
            />
          </View>
        ) : null}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: "¿Podemos usar tu cámara?",
            message:
              "Necesitamos acceder a la cámara de tu teléfono para obtener imágenes",
            buttonPositive: "Ok",
            buttonNegative: "Cancelar"
          }}
          androidRecordAudioPermissionOptions={{
            title: "¿Podemos usar tu micrófono?",
            message:
              "Necesitamos grabar audio desde tu teléfono para obtener datos para procesar",
            buttonPositive: "Ok",
            buttonNegative: "Cancelar"
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //console.log(barcodes);
          }}
        >
          <CaptureButton
            buttonDisabled={this.state.loading}
            onClick={this.takePicture.bind(this)}
          />
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 90
  },
  loadingView: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 100
  },
  loader: {}
});
