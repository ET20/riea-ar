import React from "react";
import {
  View,
  Dimensions,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar
} from "react-native";
import { materials } from "../data/materials";
import { materialsImgs } from "../data/pictures/pictures";
import {
  FlatList,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import MDI from "react-native-vector-icons/MaterialCommunityIcons";

//const { navigation } = this.props;
//const photoTaken = navigation.getParam("image");

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materiales: materials,
      recognizedMaterials: [],
      loading: true,
      photoUri: this.props.navigation.state.params.photoUri,
      photo64: this.props.navigation.state.params.photo64
    };
  }

  componentDidMount() {
    this.identifyImage();
  }

  identifyImage() {
    let _t = this;
    console.log("identifying!");

    // Initialise Clarifai api
    const Clarifai = require("clarifai");

    const app = new Clarifai.App({
      apiKey: "edce17368d7a43bfa5c5dfb89d98f017"
    });

    console.log(">> materials: ", _t.state.materiales);

    // Identify the image
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: _t.state.photo64 })
      .then(response => {
        console.log("--- response: ", response);
        let c = response.outputs[0].data.concepts.map(item => item.name);
        let rec = this.state.materiales.filter(x => c.includes(x.englishName));
        //console.log(rec);
        this.setState(
          {
            recognizedMaterials: rec
          },
          () => {
            console.log(">> found: ", _t.state.recognizedMaterials);
          }
        );
        //response.outputs[0].data.concepts[0].name
        this.displayAnswer(response.outputs[0].data.concepts[0].name).catch(
          err => alert(err)
        );
      });
  }

  displayAnswer(identifiedImage) {
    console.log("show response!", identifiedImage);
    // Dismiss the acitivty indicator
    this.setState((prevState, props) => ({
      loading: false
    }));

    /*Alert.alert(
      //title
      "Hello",
      //body
      this.state.recognizedMaterials[0].spanishName,
      "",
      { cancelable: true }
    );
    */
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    console.log(this.props.navigation.state.params);
    /*  */
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0.1)"
          barStyle="light-content"
          translucent
          animated
        />
        <View style={styles.header}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
            locations={[0, 1]}
            style={styles.headerGradient}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={styles.headerIconContainer}>
                <MDI style={styles.headerIcon} name="arrow-left" />
              </View>
            </TouchableOpacity>

            <Text style={styles.headerTitle} />
          </LinearGradient>
        </View>

        <View style={styles.mainContent}>
          {this.state.loading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#fff"
              />
              <Text style={styles.loaderText}> Buscando materiales...</Text>
            </View>
          ) : this.state.recognizedMaterials.length > 0 ? (
            <View style={styles.list}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.listHeader}>
                  <MDI
                    name="eye-outline"
                    //style={styles.listHeaderIcon}
                    size={16}
                    color="#000"
                  />
                  <Text style={styles.listHeaderText}>
                    Materiales reconocidos
                  </Text>
                </View>
              </View>
              <FlatList
                contentContainerStyle={{ paddingLeft: 16 }}
                horizontal={true}
                style={styles.materials}
                data={this.state.recognizedMaterials}
                keyExtractor={(item, index) => item.englishName}
                renderItem={({ item }) => (
                  <View style={styles.materialItem}>
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate("Details", {
                          material: item
                        })
                      }
                    >
                      <Image
                        style={styles.materialItemImage}
                        source={materialsImgs[item.englishName]}
                      />
                      <View style={{ height: 50 }}>
                        <Text style={styles.materialItemText}>
                          {this.Capitalize(item.spanishName)}
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={styles.loadingView}>
              <MDI
                name="eye-off-outline"
                //style={styles.listHeaderIcon}
                size={50}
                color="#fff"
              />
              <Text style={styles.loaderText}>
                No hemos podido reconocer materiales. Intenta de nuevo...
              </Text>
            </View>
          )}

          <View style={styles.preview}>
            <Image style={styles.photo} source={{ uri: this.state.photoUri }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000"
  },
  header: {
    height: 56 + StatusBar.currentHeight,

    zIndex: 100
  },
  headerGradient: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
    alignSelf: "stretch",
    alignItems: "center"
  },
  headerIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56
  },
  headerIcon: {
    fontSize: 24,
    color: "#fff"
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff"
  },

  mainContent: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end"
  },
  loadingView: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 95
  },
  loader: {},
  loaderText: {
    color: "#fff",
    fontSize: 16
  },
  preview: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 90
  },
  photo: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  list: {
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 100
  },
  listHeader: {
    borderRadius: 24,
    height: 36,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 16,
    marginLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4
  },
  listHeaderIcon: {
    //height: 36,
    flex: 1
  },
  listHeaderText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000"
  },
  materials: {
    width: Dimensions.get("window").width,
    height: 244
  },
  materialItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 200,
    width: 150,
    marginRight: 16,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4
  },
  materialItemImage: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  materialItemText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
    marginTop: 8
  },
  noMaterials: {
    width: Dimensions.get("window").width / 3,
    height: 244,
    paddingLeft: 16
  },
  noMaterialText: {
    fontSize: 16,
    color: "#000"
  }
});
