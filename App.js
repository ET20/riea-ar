import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import CameraScreen from "./screens/Camera";
import ResultsScreen from "./screens/Results";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Home",
        header: null
      })
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Details",
        header: null
      })
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Camera",
        header: null
      })
    },
    Results: {
      screen: ResultsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Results",
        header: null
      })
    }
  },
  {
    initialRouteName: "Camera",
    headerMode: "screen"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer style={{ backgroundColor: "#000" }} />;
  }
}
