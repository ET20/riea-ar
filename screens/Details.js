import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ToolbarAndroid,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import MDI from "react-native-vector-icons/MaterialCommunityIcons";
import { materialsImgs } from "../data/pictures/pictures";

export default class materialesDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {}
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("material");

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
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)"]}
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
          <View style={styles.pictureContainer}>
            <Image
              style={{ flex: 1, resizeMode: "center" }}
              source={materialsImgs[item.englishName]}
              resizeMode="cover"
            />
          </View>
          <ScrollView style={styles.materialView}>
            <View style={styles.materialViewSheet}>
              <View style={styles.materialTitle}>
                <Text style={styles.materialTitleText}>
                  {this.Capitalize(item.spanishName)}
                </Text>
              </View>
              <View style={styles.materialDesc}>
                <Text style={styles.materialDescText}>{item.description}</Text>
              </View>
            </View>
          </ScrollView>
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
  mainContent: {
    //flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 90
  },
  pictureContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 100
  },
  materialView: {
    zIndex: 110,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  materialViewSheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 20,
    marginRight: 20
  },
  materialTitle: {
    padding: 20,
    minHeight: Dimensions.get("window").height * 0.8,
    justifyContent: "flex-end"
  },
  materialTitleText: {
    fontSize: 48,
    color: "#fff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: "rgba(0,0,0,0.5)"
  },
  materialDesc: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,

    elevation: 10
    //minHeight: Dimensions.get('window').height * 0.7,
  },
  materialDescText: {
    fontSize: 16
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
  }
});
